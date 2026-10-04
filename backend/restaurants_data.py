from typing import List, Dict, Any

# Curated Indian restaurant dataset with rich dietary, city, and INR budget metadata
SEED_RESTAURANTS: List[Dict[str, Any]] = [
    # --- MUMBAI ---
    {
        "id": "mum-1",
        "name": "Swati Snacks & Chaat",
        "city": "Mumbai",
        "locality": "Tardeo / Nariman Point",
        "cuisine": "Gujarati, Maharashtrian & Street Food",
        "place_type": "Iconic Pure Veg Dining",
        "price": "₹₹",
        "cost_per_person_inr": 450,
        "cost_for_two_inr": 900,
        "rating": 4.8,
        "review_count": 820,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Family Dining & Casual", "Heritage Food Spot", "Quick & Hygienic"],
        "distance_km": 2.1,
        "address": "248 Karve Road, Tardeo, Mumbai",
        "description": "Legendary institution renowned for immaculate Gujarati, Maharashtrian, and street delicacies. Dedicated Jain preparations prepared strictly without onion, garlic, or root vegetables.",
        "image_url": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Panki Chutney (Cooked in Banana Leaf)", "price_inr": 280, "dietary": ["Pure Veg", "Jain Available", "Gluten-Free"]},
            {"name": "Baked Masala Khichdi with Curd", "price_inr": 340, "dietary": ["Pure Veg", "Jain Available"]},
            {"name": "Thalipeeth with White Butter", "price_inr": 260, "dietary": ["Pure Veg", "Maharashtrian"]}
        ],
        "tags": ["Maharashtrian", "Gujarati", "Jain Food", "Street Food", "Pure Veg", "Iconic"]
    },
    {
        "id": "mum-2",
        "name": "Aaswad Upahar & Mithai",
        "city": "Mumbai",
        "locality": "Dadar West",
        "cuisine": "Authentic Maharashtrian & Fast Food",
        "place_type": "Heritage Eatery",
        "price": "₹",
        "cost_per_person_inr": 250,
        "cost_for_two_inr": 500,
        "rating": 4.9,
        "review_count": 1420,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Casual & Quick", "Iconic Breakfast", "Family Dining"],
        "distance_km": 1.4,
        "address": "Sanskar Bharati Building, Dadar West, Mumbai",
        "description": "Award-winning Maharashtrian haven famed for world-famous spicy Misal Pav, Kothimbir Vadi, and Puran Poli with complete pure-veg kitchen discipline.",
        "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Award-Winning Puneri Misal Pav", "price_inr": 130, "dietary": ["Pure Veg", "Spicy", "Jain Available"]},
            {"name": "Steamed Kothimbir Vadi with Coconut Chutney", "price_inr": 140, "dietary": ["Pure Veg", "Gluten-Free"]},
            {"name": "Hot Puran Poli with Desi Ghee", "price_inr": 110, "dietary": ["Pure Veg", "Eggless"]}
        ],
        "tags": ["Maharashtrian", "Misal Pav", "Pure Veg", "Budget Friendly", "Iconic"]
    },
    {
        "id": "mum-3",
        "name": "Shiv Sagar Multicuisine",
        "city": "Mumbai",
        "locality": "Juhu / Churchgate",
        "cuisine": "North Indian, Indo-Chinese, South Indian & Pav Bhaji",
        "place_type": "Multicuisine Family Restaurant",
        "price": "₹₹",
        "cost_per_person_inr": 420,
        "cost_for_two_inr": 850,
        "rating": 4.7,
        "review_count": 940,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Family Dining & Casual", "Crowd Pleaser", "Comfort Food"],
        "distance_km": 1.8,
        "address": "Opposite Juhu Beach, Juhu, Mumbai",
        "description": "The quintessential Mumbai crowd-pleaser! Serves mouthwatering butter Pav Bhaji, North Indian curries, sizzlers, and fiery Indo-Chinese noodles with an extensive Jain-special menu.",
        "image_url": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Amul Special Butter Pav Bhaji", "price_inr": 230, "dietary": ["Pure Veg", "Jain Available"]},
            {"name": "Veg Manchurian Gravy with Fried Rice", "price_inr": 310, "dietary": ["Pure Veg", "Indo-Chinese", "Jain Available"]},
            {"name": "Paneer Butter Masala with Butter Naan", "price_inr": 340, "dietary": ["Pure Veg", "North Indian"]}
        ],
        "tags": ["Indo-Chinese", "North Indian", "Pav Bhaji", "Jain Food", "Pure Veg", "Late Night"]
    },
    {
        "id": "mum-4",
        "name": "Copper Chimney Tandoor & Grill",
        "city": "Mumbai",
        "locality": "Worli / Bandra West",
        "cuisine": "North Indian, Mughlai & Frontier Cuisine",
        "place_type": "Premium Family Dining",
        "price": "₹₹₹",
        "cost_per_person_inr": 850,
        "cost_for_two_inr": 1700,
        "rating": 4.8,
        "review_count": 680,
        "dietary": {
            "pure_veg": False,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": False,
            "eggless_options": True,
            "halal_certified": True,
            "gluten_free_options": True,
            "nut_free_options": False
        },
        "vibes": ["Premium Dining", "Cozy & Elegant", "Tandoor Special"],
        "distance_km": 3.0,
        "address": "Lotus Court, Dr Annie Besant Rd, Worli, Mumbai",
        "description": "Pioneering North Indian restaurant renowned since 1972 for slow-cooked Dal Maharaja, Dum Biryanis, tender kebabs, and separate pure-veg/Jain curries.",
        "image_url": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Dal Maharaja (24-Hour Slow Cooked)", "price_inr": 390, "dietary": ["Vegetarian", "Jain Available", "Gluten-Free"]},
            {"name": "Smoked Butter Chicken with Roomali", "price_inr": 540, "dietary": ["Halal Meat", "Gluten-Free"]},
            {"name": "Paneer Tikka Chelo Kebab", "price_inr": 460, "dietary": ["Vegetarian", "Gluten-Free"]}
        ],
        "tags": ["North Indian", "Mughlai", "Biryani", "Halal", "Family Dining", "Kebabs"]
    },
    {
        "id": "mum-5",
        "name": "Mainland China & Dim Sum Bar",
        "city": "Mumbai",
        "locality": "Andheri West / Powai",
        "cuisine": "Authentic Chinese & Pan-Asian",
        "place_type": "Casual Fine Dining",
        "price": "₹₹₹",
        "cost_per_person_inr": 750,
        "cost_for_two_inr": 1500,
        "rating": 4.7,
        "review_count": 520,
        "dietary": {
            "pure_veg": False,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": True,
            "gluten_free_options": True,
            "nut_free_options": False
        },
        "vibes": ["Trendy & Lively", "Modern Asian", "Celebration Dining"],
        "distance_km": 3.5,
        "address": "Shalimar Morya Park, Andheri West, Mumbai",
        "description": "India's favorite Asian dining destination. Offers wok-tossed Hakka noodles, delicate crystal dumplings, and customized Jain wok preparations.",
        "image_url": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Edamame & Truffle Dumplings (4 pcs)", "price_inr": 420, "dietary": ["Vegetarian", "Vegan Available"]},
            {"name": "General Tao's Crispy Tofu & Shiitake", "price_inr": 440, "dietary": ["Vegetarian", "Jain Available"]},
            {"name": "Chilli Garlic Chicken Hakka Noodles", "price_inr": 460, "dietary": ["Halal Meat"]}
        ],
        "tags": ["Chinese", "Pan-Asian", "Dim Sum", "Indo-Chinese", "Halal Options", "Jain Available"]
    },

    # --- PUNE ---
    {
        "id": "pun-1",
        "name": "Vaishali Cafe & South Indian",
        "city": "Pune",
        "locality": "FC Road, Shivajinagar",
        "cuisine": "South Indian, Fast Food & Chai",
        "place_type": "Legendary Student & Family Hub",
        "price": "₹",
        "cost_per_person_inr": 200,
        "cost_for_two_inr": 400,
        "rating": 4.9,
        "review_count": 2100,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Bustling Garden Patio", "Iconic Campus Hub", "Casual & Quick"],
        "distance_km": 1.2,
        "address": "1218/1 Fergusson College Rd, Pune",
        "description": "Pune's undisputed cultural hotspot. Famous for crispy Mysore Cheese Dosa, SPDP (Sev Potato Dahi Puri), and steaming South Indian filter coffee.",
        "image_url": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Special Mysore Cheese Masala Dosa", "price_inr": 180, "dietary": ["Pure Veg", "Jain Available"]},
            {"name": "Legendary SPDP (Sev Potato Dahi Puri)", "price_inr": 120, "dietary": ["Pure Veg"]},
            {"name": "Filter Kaapi (South Indian Brass Cup)", "price_inr": 60, "dietary": ["Pure Veg", "Gluten-Free"]}
        ],
        "tags": ["South Indian", "Dosa", "Pure Veg", "Chaat", "Pune Heritage", "Budget Friendly"]
    },
    {
        "id": "pun-2",
        "name": "Marz-O-Rin Heritage Cafe",
        "city": "Pune",
        "locality": "Camp / MG Road",
        "cuisine": "Bakery, Continental & Parsi Cafe",
        "place_type": "Heritage Bakery & Cafe",
        "price": "₹",
        "cost_per_person_inr": 180,
        "cost_for_two_inr": 350,
        "rating": 4.7,
        "review_count": 1300,
        "dietary": {
            "pure_veg": False,
            "jain_available": False,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": True,
            "gluten_free_options": False,
            "nut_free_options": True
        },
        "vibes": ["Colonial Balcony", "Budget Friendly", "Casual Bites"],
        "distance_km": 2.5,
        "address": "6 Bakthiar Plaza, MG Road, Camp, Pune",
        "description": "Founded in 1965 in a charming colonial building, famed for chutney sandwiches, chicken farcha rolls, macaroni bakes, and eggless cakes.",
        "image_url": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Famous Green Chutney Brown Bread Sandwich", "price_inr": 70, "dietary": ["Vegetarian", "Vegan Available"]},
            {"name": "Baked Macaroni & Cheese", "price_inr": 140, "dietary": ["Vegetarian"]},
            {"name": "Eggless Rich Plum / Walnut Cake", "price_inr": 90, "dietary": ["Eggless", "Vegetarian"]}
        ],
        "tags": ["Cafe & Bakery", "Sandwiches", "Eggless Options", "Budget Friendly", "Parsi Vibe"]
    },
    {
        "id": "pun-3",
        "name": "Shabree & Hotel Veg Treat",
        "city": "Pune",
        "locality": "FC Road",
        "cuisine": "Maharashtrian Thali & Multicuisine",
        "place_type": "Authentic Thali Experience",
        "price": "₹₹",
        "cost_per_person_inr": 480,
        "cost_for_two_inr": 950,
        "rating": 4.8,
        "review_count": 910,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Traditional Wooden Decor", "Family Feast", "Warm Hospitality"],
        "distance_km": 1.5,
        "address": "Parichay Hotel, FC Road, Pune",
        "description": "Authentic Maharashtrian Thali feast with unlimited Pithla Bhakri, Bharli Vangi, Aamti, Puri, and Shrikhand with segregated Jain preparations.",
        "image_url": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Unlimited Shabree Maharashtrian Thali", "price_inr": 480, "dietary": ["Pure Veg", "Jain Available", "Gluten-Free Bhakri"]},
            {"name": "Pithla Bhakri with Thecha & Raw Onion", "price_inr": 220, "dietary": ["Pure Veg", "Gluten-Free"]},
            {"name": "Kesar Elaichi Shrikhand Cup", "price_inr": 90, "dietary": ["Pure Veg", "Eggless"]}
        ],
        "tags": ["Maharashtrian", "Thali", "Pure Veg", "Jain Available", "Pune Special"]
    },

    # --- DELHI NCR ---
    {
        "id": "del-1",
        "name": "Gulati Restaurant",
        "city": "Delhi NCR",
        "locality": "Pandara Road, Central Delhi",
        "cuisine": "North Indian, Mughlai & Frontier Tandoor",
        "place_type": "Iconic Delhi Institution",
        "price": "₹₹₹",
        "cost_per_person_inr": 850,
        "cost_for_two_inr": 1700,
        "rating": 4.9,
        "review_count": 1850,
        "dietary": {
            "pure_veg": False,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": False,
            "eggless_options": True,
            "halal_certified": True,
            "gluten_free_options": True,
            "nut_free_options": False
        },
        "vibes": ["Bustling Pandara Road", "Late Night Dining", "North Indian Heaven"],
        "distance_km": 2.0,
        "address": "6 Pandara Road Market, New Delhi",
        "description": "Delhi's most revered Butter Chicken and Galouti Kebab destination, alongside an independent Veg Gulati kitchen next door serving strictly pure-veg and Jain thalis.",
        "image_url": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "The Original Butter Chicken", "price_inr": 590, "dietary": ["Halal Meat", "Gluten-Free"]},
            {"name": "Dal Makhani (Overnight Simmered)", "price_inr": 380, "dietary": ["Vegetarian", "Jain Available", "Gluten-Free"]},
            {"name": "Melt-in-Mouth Kakori Kebabs", "price_inr": 620, "dietary": ["Halal Meat"]}
        ],
        "tags": ["North Indian", "Butter Chicken", "Mughlai", "Halal", "Pandara Road", "Late Night"]
    },
    {
        "id": "del-2",
        "name": "Haldiram's Food Court & Sweets",
        "city": "Delhi NCR",
        "locality": "Connaught Place / Chandni Chowk",
        "cuisine": "North Indian, South Indian, Street Chaat & Mithai",
        "place_type": "Mega Pure Veg Food Court",
        "price": "₹₹",
        "cost_per_person_inr": 320,
        "cost_for_two_inr": 650,
        "rating": 4.7,
        "review_count": 1500,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Bright & Clean", "Family Friendly", "Fast Casual"],
        "distance_km": 0.8,
        "address": "Block L, Connaught Place, New Delhi",
        "description": "The king of Indian street chaat, Raj Kachori, Chhole Bhature, and pure vegetarian North & South Indian meals with 100% pure ghee and Jain options.",
        "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Imperial Raj Kachori Chaat", "price_inr": 160, "dietary": ["Pure Veg", "Chaat"]},
            {"name": "Paneer Amritsari Chhole Bhature", "price_inr": 210, "dietary": ["Pure Veg"]},
            {"name": "Shahi Thali with Dal Makhani & Paneer", "price_inr": 360, "dietary": ["Pure Veg", "Jain Available"]}
        ],
        "tags": ["Chaat", "North Indian", "Pure Veg", "Chhole Bhature", "CP Delhi", "Jain Food"]
    },

    # --- BENGALURU ---
    {
        "id": "blr-1",
        "name": "Vidyarthi Bhavan Tiffin Room",
        "city": "Bengaluru",
        "locality": "Gandhi Bazaar, Basavanagudi",
        "cuisine": "Traditional Karnataka South Indian",
        "place_type": "1943 Heritage Tiffin Spot",
        "price": "₹",
        "cost_per_person_inr": 160,
        "cost_for_two_inr": 320,
        "rating": 4.9,
        "review_count": 2800,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Vintage Coffee House", "Iconic Breakfast", "Quick Service"],
        "distance_km": 2.2,
        "address": "32 Gandhi Bazaar Main Rd, Basavanagudi, Bengaluru",
        "description": "Feeding Bengaluru since 1943! Golden, thick, melt-in-mouth Benne Masala Dosas served with endless coconut chutney, Kesari Bath, and tumbler coffee.",
        "image_url": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Crispy Benne Masala Dosa", "price_inr": 90, "dietary": ["Pure Veg", "Gluten-Free", "Jain Available"]},
            {"name": "Steaming Khara Bath (Upma)", "price_inr": 60, "dietary": ["Pure Veg"]},
            {"name": "Chow-Chow Bath (Sweet Kesari + Khara)", "price_inr": 85, "dietary": ["Pure Veg"]}
        ],
        "tags": ["South Indian", "Benne Dosa", "Bangalore Legend", "Pure Veg", "Breakfast"]
    },
    {
        "id": "blr-2",
        "name": "Nagarjuna Andhra Style Meals",
        "city": "Bengaluru",
        "locality": "Indiranagar / Residency Road",
        "cuisine": "Fiery Andhra & Biryani",
        "place_type": "Spicy Banana Leaf Dining",
        "price": "₹₹",
        "cost_per_person_inr": 520,
        "cost_for_two_inr": 1050,
        "rating": 4.8,
        "review_count": 1700,
        "dietary": {
            "pure_veg": False,
            "jain_available": False,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": True,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Banana Leaf Feast", "Bustling & Spicy", "Group Favorite"],
        "distance_km": 1.6,
        "address": "Residency Road, Ashok Nagar, Bengaluru",
        "description": "Famous for generous Andhra banana leaf meals with gunpowder podi, fiery chili chicken, and fragrant dum biryanis with certified Halal meats.",
        "image_url": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Unlimited Andhra Veg Banana Leaf Meal", "price_inr": 310, "dietary": ["Vegetarian", "Vegan", "Gluten-Free"]},
            {"name": "Nagarjuna Andhra Chilli Chicken", "price_inr": 380, "dietary": ["Halal Meat", "Gluten-Free", "Spicy"]},
            {"name": "Hyderabadi Chicken Dum Biryani", "price_inr": 420, "dietary": ["Halal Meat", "Gluten-Free"]}
        ],
        "tags": ["Andhra", "Biryani", "Spicy", "Banana Leaf", "Halal Meat", "South Indian"]
    },

    # --- HYDERABAD ---
    {
        "id": "hyd-1",
        "name": "Paradise Biryani & Nizami Grills",
        "city": "Hyderabad",
        "locality": "Secunderabad / Banjara Hills",
        "cuisine": "Authentic Hyderabadi Biryani & Mughlai",
        "place_type": "Nizami Institution",
        "price": "₹₹",
        "cost_per_person_inr": 450,
        "cost_for_two_inr": 900,
        "rating": 4.7,
        "review_count": 2400,
        "dietary": {
            "pure_veg": False,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": False,
            "eggless_options": True,
            "halal_certified": True,
            "gluten_free_options": True,
            "nut_free_options": False
        },
        "vibes": ["Heritage Hyderabad", "Grand Feast", "Late Night"],
        "distance_km": 2.4,
        "address": "MG Road, Secunderabad, Hyderabad",
        "description": "World-famous since 1953 for dum-cooked basmati rice with fragrant spices, tender halal goat/chicken, mirchi ka salan, and vegetarian paneer biryanis.",
        "image_url": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Special Hyderabadi Mutton Dum Biryani", "price_inr": 480, "dietary": ["Halal Meat", "Gluten-Free"]},
            {"name": "Mirchi Ka Salan with Bagara Rice", "price_inr": 280, "dietary": ["Vegetarian", "Gluten-Free", "Spicy"]},
            {"name": "Shahi Tukda with Rabdi", "price_inr": 160, "dietary": ["Vegetarian", "Eggless"]}
        ],
        "tags": ["Hyderabadi", "Biryani", "Halal Certified", "Mughlai", "Iconic"]
    },
    {
        "id": "hyd-2",
        "name": "Chutneys Multicuisine & Babai Hotel",
        "city": "Hyderabad",
        "locality": "Banjara Hills / Jubilee Hills",
        "cuisine": "South Indian, North Indian & 7 Chutneys Special",
        "place_type": "Premium Pure Veg Dining",
        "price": "₹₹",
        "cost_per_person_inr": 380,
        "cost_for_two_inr": 750,
        "rating": 4.8,
        "review_count": 1100,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Family Dining & Casual", "Pure Veg Sanctuary", "Morning Tiffins"],
        "distance_km": 1.9,
        "address": "Road No 3, Banjara Hills, Hyderabad",
        "description": "Celebrated for steaming Babai Idlis drenched in butter and served with seven house-crafted chutneys, plus a full North Indian curry & Jain menu.",
        "image_url": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Babai Ghee Idli with 7 Chutneys", "price_inr": 160, "dietary": ["Pure Veg", "Gluten-Free", "Jain Available"]},
            {"name": "Steam Dosa with Guntur Karam Podi", "price_inr": 190, "dietary": ["Pure Veg", "Spicy"]},
            {"name": "Paneer Methi Chaman with Butter Kulcha", "price_inr": 320, "dietary": ["Pure Veg", "North Indian"]}
        ],
        "tags": ["South Indian", "7 Chutneys", "Pure Veg", "Jain Available", "Hyderabad"]
    },

    # --- AHMEDABAD ---
    {
        "id": "amd-1",
        "name": "Agashiye - House of MG",
        "city": "Ahmedabad",
        "locality": "Lal Darwaja / Sidi Saiyyed",
        "cuisine": "Authentic Gujarati Thali & Heritage Dining",
        "place_type": "Rooftop Heritage Feast",
        "price": "₹₹₹",
        "cost_per_person_inr": 900,
        "cost_for_two_inr": 1800,
        "rating": 4.9,
        "review_count": 1350,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Heritage Haveli", "Rooftop Terrace", "Grand Royal Thali"],
        "distance_km": 1.1,
        "address": "The House of MG, Opp Sidi Saiyyed Mosque, Ahmedabad",
        "description": "World-renowned Gujarati fine dining served on brass thalis on a breezy haveli terrace. 100% Pure Veg and meticulous Jain arrangements.",
        "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Grand Agashiye Gujarati Royal Thali", "price_inr": 900, "dietary": ["Pure Veg", "Jain Available", "Gluten-Free Options"]},
            {"name": "Surti Undhiyu with Puri", "price_inr": 340, "dietary": ["Pure Veg", "Jain Available"]},
            {"name": "Rasawala Khaman Dhokla with Papaya Sambharo", "price_inr": 180, "dietary": ["Pure Veg", "Vegan"]}
        ],
        "tags": ["Gujarati", "Thali", "Pure Veg", "Jain Paradise", "Heritage Haveli", "Ahmedabad"]
    },

    # --- CHENNAI ---
    {
        "id": "chn-1",
        "name": "Murugan Idli Shop & Chettinad",
        "city": "Chennai",
        "locality": "T. Nagar / Besant Nagar",
        "cuisine": "South Indian & Chettinad Tiffins",
        "place_type": "Iconic Tiffin Joint",
        "price": "₹",
        "cost_per_person_inr": 180,
        "cost_for_two_inr": 360,
        "rating": 4.8,
        "review_count": 1900,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Bustling Banana Leaf", "Quick & Piping Hot", "Breakfast & Supper"],
        "distance_km": 1.3,
        "address": "G.N. Chetty Road, T. Nagar, Chennai",
        "description": "Cloud-soft steaming mallipoo idlis with four distinct chutneys, podi ghee dosas, and authentic sweet pongal on plantain leaves.",
        "image_url": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Mallipoo Soft Idlis (4 pcs) with 4 Chutneys", "price_inr": 100, "dietary": ["Pure Veg", "Gluten-Free", "Jain Available"]},
            {"name": "Ghee Podi Masala Dosa", "price_inr": 170, "dietary": ["Pure Veg", "Gluten-Free"]},
            {"name": "Sakkarai Sweet Ghee Pongal", "price_inr": 90, "dietary": ["Pure Veg", "Eggless"]}
        ],
        "tags": ["South Indian", "Idli", "Dosa", "Pure Veg", "Chennai Legend", "Budget Friendly"]
    },

    # --- KOLKATA ---
    {
        "id": "kol-1",
        "name": "Mocambo Heritage Bar & Restaurant",
        "city": "Kolkata",
        "locality": "Park Street",
        "cuisine": "Continental, Anglo-Indian & Italian",
        "place_type": "Park Street 1956 Heritage",
        "price": "₹₹₹",
        "cost_per_person_inr": 700,
        "cost_for_two_inr": 1400,
        "rating": 4.8,
        "review_count": 1600,
        "dietary": {
            "pure_veg": False,
            "jain_available": False,
            "vegetarian": True,
            "vegan_available": False,
            "eggless_options": True,
            "halal_certified": True,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Vintage Chandeliers", "Romantic Nostalgia", "Park Street Classic"],
        "distance_km": 1.7,
        "address": "25B Park Street, Kolkata",
        "description": "Kolkata's legendary dining salon since 1956. Famed for Devilled Crab, Chicken Tetrazzini, Fish Florentine, and baked cheese continental specialties.",
        "image_url": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Baked Chicken Tetrazzini in Cheese Sauce", "price_inr": 480, "dietary": ["Halal Meat"]},
            {"name": "Baked Stuffed Mushroom Florentine", "price_inr": 380, "dietary": ["Vegetarian"]},
            {"name": "Caramel Bread Custard", "price_inr": 160, "dietary": ["Vegetarian"]}
        ],
        "tags": ["Continental", "Italian", "Park Street", "Heritage", "Kolkata Nostalgia"]
    },

    # --- NAVI MUMBAI ---
    {
        "id": "nvm-1",
        "name": "Bhagat Tarachand & Thali",
        "city": "Navi Mumbai",
        "locality": "Vashi / Seawoods",
        "cuisine": "North Indian, Rajasthani & Punjabi Veg",
        "place_type": "Vegetarian Heavyweight",
        "price": "₹₹",
        "cost_per_person_inr": 380,
        "cost_for_two_inr": 750,
        "rating": 4.8,
        "review_count": 980,
        "dietary": {
            "pure_veg": True,
            "jain_available": True,
            "vegetarian": True,
            "vegan_available": True,
            "eggless_options": True,
            "halal_certified": False,
            "gluten_free_options": True,
            "nut_free_options": True
        },
        "vibes": ["Family Dining & Casual", "Desi Ghee Delicacies", "Comfort Food"],
        "distance_km": 2.0,
        "address": "Sector 17, Vashi, Navi Mumbai",
        "description": "Beloved across Mumbai & Navi Mumbai for Kutchi beer (spiced chaas in beer bottles), piping hot butter rotis, and rich paneer curries with full Jain options.",
        "image_url": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
        "signature_dishes": [
            {"name": "Special Kutchi Beer (Chilled Spiced Buttermilk)", "price_inr": 80, "dietary": ["Pure Veg", "Gluten-Free", "Jain Available"]},
            {"name": "Paneer Bhurji / Paneer Tikka Masala", "price_inr": 310, "dietary": ["Pure Veg", "Jain Available"]},
            {"name": "Dal Fry with Ghee Chapati", "price_inr": 210, "dietary": ["Pure Veg", "Jain Available"]}
        ],
        "tags": ["North Indian", "Pure Veg", "Jain Food", "Punjabi", "Navi Mumbai", "Family Dining"]
    }
]

# Supported Indian metro cities
INDIAN_CITIES = [
    "Mumbai",
    "Pune",
    "Delhi NCR",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Navi Mumbai"
]
