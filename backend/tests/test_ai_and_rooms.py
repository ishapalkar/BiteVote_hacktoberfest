import pytest
from httpx import AsyncClient, ASGITransport
from backend.main import app
from backend.restaurants_data import SEED_RESTAURANTS
from backend.ai_engine import filter_hard_constraints, calculate_preference_scores, fallback_compromise_engine

@pytest.mark.asyncio
async def test_health_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "Google Gemma 2" in data["ai_engine"]["provider"]

@pytest.mark.asyncio
async def test_restaurants_indian_cities_and_diets():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # 1. Cities endpoint
        cities_res = await ac.get("/api/restaurants/cities")
        assert cities_res.status_code == 200
        cities = cities_res.json()
        assert "Mumbai" in cities
        assert "Pune" in cities
        assert "Bengaluru" in cities

        # 2. Filter by Mumbai city
        mumbai_res = await ac.get("/api/restaurants?city=Mumbai")
        assert mumbai_res.status_code == 200
        mumbai_list = mumbai_res.json()
        assert len(mumbai_list) >= 4
        assert all(r["city"] == "Mumbai" for r in mumbai_list)

        # 3. Filter by Jain diet
        jain_res = await ac.get("/api/restaurants?diet=jain")
        assert jain_res.status_code == 200
        jain_list = jain_res.json()
        assert all(r["dietary"]["jain_available"] is True for r in jain_list)

@pytest.mark.asyncio
async def test_mumbai_group_compromise_flow():
    """
    Test exact prompt scenario:
    Sarah → Jain + ₹300–500 + Maharashtrian
    Rahul → Vegetarian + ₹400–700 + North Indian
    Aisha → Vegetarian + ₹300–600 + Chinese / Indo-Chinese
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # 1. Create Room in Mumbai
        create_res = await ac.post("/api/rooms", json={
            "name": "Mumbai Foodies Squad",
            "host_name": "Sarah",
            "host_avatar": "🪷",
            "city": "Mumbai"
        })
        assert create_res.status_code == 200
        room = create_res.json()
        code = room["code"]
        sarah_id = room["participants"][0]["id"]

        # 2. Add Rahul and Aisha
        join_rahul = await ac.post(f"/api/rooms/{code}/join", json={"name": "Rahul", "avatar": "🍛"})
        assert join_rahul.status_code == 200
        rahul_id = join_rahul.json()["participants"][1]["id"]

        join_aisha = await ac.post(f"/api/rooms/{code}/join", json={"name": "Aisha", "avatar": "🥟"})
        assert join_aisha.status_code == 200
        aisha_id = join_aisha.json()["participants"][2]["id"]

        # 3. Update Preferences
        # Sarah: Jain + ₹300-500 + Maharashtrian
        await ac.post(f"/api/rooms/{code}/preferences?participant_id={sarah_id}", json={
            "dietary": {"pure_veg": True, "jain": True, "vegetarian": True, "vegan": False, "eggless": True, "halal": False, "gluten_free": False, "lactose_free": False, "nut_free": False},
            "cravings": ["Maharashtrian", "Street Food"],
            "dislikes": [],
            "budget_tier": "₹₹",
            "budget_min": 300,
            "budget_max": 500,
            "vibe": "Family Dining & Casual",
            "max_distance": 5.0
        })

        # Rahul: Vegetarian + ₹400-700 + North Indian
        await ac.post(f"/api/rooms/{code}/preferences?participant_id={rahul_id}", json={
            "dietary": {"pure_veg": False, "jain": False, "vegetarian": True, "vegan": False, "eggless": False, "halal": False, "gluten_free": False, "lactose_free": False, "nut_free": False},
            "cravings": ["North Indian", "Tandoori"],
            "dislikes": [],
            "budget_tier": "₹₹",
            "budget_min": 400,
            "budget_max": 700,
            "vibe": "Family Dining & Casual",
            "max_distance": 5.0
        })

        # Aisha: Vegetarian + ₹300-600 + Chinese / Indo-Chinese
        await ac.post(f"/api/rooms/{code}/preferences?participant_id={aisha_id}", json={
            "dietary": {"pure_veg": False, "jain": False, "vegetarian": True, "vegan": False, "eggless": False, "halal": False, "gluten_free": False, "lactose_free": False, "nut_free": False},
            "cravings": ["Indo-Chinese", "Chinese"],
            "dislikes": [],
            "budget_tier": "₹₹",
            "budget_min": 300,
            "budget_max": 600,
            "vibe": "Family Dining & Casual",
            "max_distance": 5.0
        })

        # 4. Advance to voting & submit votes
        await ac.post(f"/api/rooms/{code}/status?status=voting")
        await ac.post(f"/api/rooms/{code}/vote", json={
            "participant_id": sarah_id,
            "votes": {"mum-1": "like", "mum-2": "like", "mum-3": "like"}
        })
        await ac.post(f"/api/rooms/{code}/vote", json={
            "participant_id": rahul_id,
            "votes": {"mum-3": "like", "mum-4": "like"}
        })
        await ac.post(f"/api/rooms/{code}/vote", json={
            "participant_id": aisha_id,
            "votes": {"mum-3": "like", "mum-5": "like"}
        })

        # 5. Trigger Gemma AI Compromise Engine
        decide_res = await ac.post(f"/api/rooms/{code}/decide")
        assert decide_res.status_code == 200
        decision = decide_res.json()["decision"]

        # Assertions
        assert decision["city"] == "Mumbai"
        assert decision["match_score"] >= 80
        # Winner must satisfy Jain because Sarah is Jain!
        winner_rest = next(r for r in SEED_RESTAURANTS if r["id"] == decision["winner_id"])
        assert winner_rest["dietary"]["jain_available"] is True
        assert winner_rest["city"] == "Mumbai"

        # Check trade-offs & dish suggestions exist for all 3
        assert len(decision["trade_offs"]) == 3
        assert len(decision["dish_suggestions"]) == 3
        # Sarah's dish must be Jain or menu valid
        sarah_order = next(o for o in decision["dish_suggestions"] if o["participant"] == "Sarah")
        assert "Jain" in sarah_order["note"] or sarah_order["price_inr"] > 0

@pytest.mark.asyncio
async def test_legacy_room_schema_compatibility():
    """Verify that rooms created with legacy fields (like safe_orders instead of dish_suggestions) load with 200 OK without 500 errors."""
    from backend.database import db
    legacy_code = "LEGACY1"
    legacy_data = {
        "code": legacy_code,
        "name": "Legacy Mumbai Test Squad",
        "city": "Mumbai",
        "status": "decided",
        "host_id": "host-1",
        "participants": [
            {"id": "host-1", "name": "Sarah", "avatar": "avatar-1", "is_host": True}
        ],
        "votes": {},
        "restaurant_ids": ["mum-1", "mum-2"],
        "decision": {
            "winner_id": "mum-1",
            "winner_name": "Swati Snacks",
            "winner_cuisine": "Maharashtrian",
            "city": "Mumbai",
            "match_score": 92.5,
            "verdict_summary": "Legacy compromise summary.",
            "compromise_reasons": ["Authentic Jain menu"],
            "trade_offs": [{"participant": "Sarah", "concession": "None", "gain": "Panki"}],
            "safe_orders": [{"participant_name": "Sarah", "dish_name": "Panki Chatni", "price": "₹240", "diet_fit": "Jain compliant"}]
        }
    }
    await db.save_room(legacy_data)

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        res = await ac.get(f"/api/rooms/{legacy_code}")
        assert res.status_code == 200
        data = res.json()
        assert data["code"] == legacy_code
        assert data["decision"]["winner_id"] == "mum-1"
        assert len(data["decision"]["dish_suggestions"]) == 1
        suggestion = data["decision"]["dish_suggestions"][0]
        assert suggestion["participant"] == "Sarah"
        assert suggestion["dish"] == "Panki Chatni"
        assert suggestion["price_inr"] == 240

@pytest.mark.asyncio
async def test_crave_clash_signals_flow():
    """Verify that Crave Clash soft signals are integrated without overriding hard dietary boundaries."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # Create room with Jain participant
        create_res = await ac.post("/api/rooms", json={
            "name": "Crave Clash Test Room",
            "host_name": "Sarah",
            "host_avatar": "food-samosa",
            "city": "Mumbai"
        })
        assert create_res.status_code == 200
        room_data = create_res.json()
        code = room_data["code"]
        host_id = room_data["participants"][0]["id"]

        # Sarah is strict Jain
        await ac.post(f"/api/rooms/{code}/preferences?participant_id={host_id}", json={
            "dietary": {"pure_veg": True, "jain": True, "vegetarian": True},
            "cravings": ["Maharashtrian"],
            "budget_min": 300,
            "budget_max": 500
        })

        # Submit votes
        await ac.post(f"/api/rooms/{code}/vote", json={
            "participant_id": host_id,
            "votes": {"mum-1": "like", "mum-2": "like", "mum-3": "like"}
        })

        # Call decide with Crave Clash soft signals favoring pizza & casual
        decide_res = await ac.post(f"/api/rooms/{code}/decide", json={
            "crave_clash": {
                "comfort": "pizza",
                "flavor": "spicy",
                "wallet": "budget",
                "vibe": "cafe"
            }
        })
        assert decide_res.status_code == 200
        res_data = decide_res.json()
        assert res_data["crave_clash"]["comfort"] == "pizza"

        decision = res_data["decision"]
        assert decision["match_score"] >= 80

        # Non-negotiable constraint: winner MUST support Jain despite game signals!
        from backend.restaurants_data import SEED_RESTAURANTS
        winner = next(r for r in SEED_RESTAURANTS if r["id"] == decision["winner_id"])
        assert winner["dietary"]["jain_available"] is True

@pytest.mark.asyncio
async def test_biteguide_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/api/restaurants/mum-1/biteguide")
        assert res.status_code == 200
        data = res.json()
        assert data["restaurant_id"] == "mum-1"
        assert "top_dishes" in data
        assert len(data["top_dishes"]) > 0
        assert "tasting_menu" in data
        assert "youtube_reviews" in data
        
        first_dish = data["top_dishes"][0]
        assert "name" in first_dish
        assert "recommendation_strength" in first_dish
        assert "why_try_it" in first_dish

        # Test caching
        res_cached = await ac.get("/api/restaurants/mum-1/biteguide")
        assert res_cached.status_code == 200
        assert res_cached.json()["cached"] is True

@pytest.mark.asyncio
async def test_bite_blitz_tie_break_signal_flow():
    """Verify that Bite Blitz tie-breaker breaks close ties without overriding hard dietary constraints."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # 1. Create room
        create_res = await ac.post("/api/rooms", json={
            "name": "Bite Blitz Tie Break Test",
            "host_name": "Rohan",
            "host_avatar": "food-samosa",
            "city": "Mumbai"
        })
        assert create_res.status_code == 200
        room_data = create_res.json()
        code = room_data["code"]
        host_id = room_data["participants"][0]["id"]

        # 2. Strict Jain preference
        await ac.post(f"/api/rooms/{code}/preferences?participant_id={host_id}", json={
            "dietary": {"pure_veg": True, "jain": True, "vegetarian": True},
            "cravings": ["Maharashtrian"],
            "budget_min": 250,
            "budget_max": 500
        })

        # 3. Submit votes tied between mum-1 and mum-2
        await ac.post(f"/api/rooms/{code}/vote", json={
            "participant_id": host_id,
            "votes": {"mum-1": "like", "mum-2": "like"}
        })

        # 4. Decide with Bite Blitz tie-break signal favoring mum-2 (Aaswad)
        decide_res = await ac.post(f"/api/rooms/{code}/decide", json={
            "bite_blitz": {
                "played": True,
                "winner_name": "Rohan",
                "winner_id": host_id,
                "winner_preferred_restaurant_id": "mum-2",
                "winner_preferred_restaurant_name": "Aaswad",
                "tie_break_boost": 7.5,
                "leaderboard": [{"name": "Rohan", "score": 2800}]
            }
        })
        assert decide_res.status_code == 200
        res_data = decide_res.json()
        assert res_data["bite_blitz"]["played"] is True
        assert res_data["bite_blitz"]["winner_name"] == "Rohan"

        # Check winner and non-negotiable dietary boundary
        decision = res_data["decision"]
        from backend.restaurants_data import SEED_RESTAURANTS
        winner = next(r for r in SEED_RESTAURANTS if r["id"] == decision["winner_id"])
        assert winner["dietary"]["jain_available"] is True


