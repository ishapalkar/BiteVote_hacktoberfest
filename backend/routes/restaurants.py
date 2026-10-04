from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from backend.restaurants_data import SEED_RESTAURANTS, INDIAN_CITIES
from backend.biteguide_service import generate_biteguide

router = APIRouter(prefix="/api/restaurants", tags=["restaurants"])

@router.get("/cities", response_model=List[str])
async def get_cities():
    return INDIAN_CITIES

@router.get("", response_model=List[dict])
async def get_restaurants(
    city: Optional[str] = Query(None, description="City: Mumbai, Pune, Delhi NCR, Bengaluru, etc."),
    cuisine: Optional[str] = Query(None, description="Maharashtrian, North Indian, Indo-Chinese, etc."),
    diet: Optional[str] = Query(None, description="pure_veg, jain, halal, eggless, vegan, gluten_free"),
    max_price: Optional[str] = Query(None, description="₹, ₹₹, ₹₹₹, ₹₹₹₹"),
):
    results = SEED_RESTAURANTS
    
    if city:
        city_clean = city.strip().lower()
        results = [r for r in results if r.get("city", "").strip().lower() == city_clean]
        
    if cuisine:
        c_clean = cuisine.lower()
        results = [
            r for r in results 
            if c_clean in r["cuisine"].lower() or any(c_clean in t.lower() for t in r.get("tags", []))
        ]
        
    if diet:
        diet_clean = diet.lower().replace("-", "_")
        results = [
            r for r in results
            if r.get("dietary", {}).get(diet_clean, False) or 
               (diet_clean == "jain" and r.get("dietary", {}).get("jain_available", False)) or
               (diet_clean == "pure_veg" and r.get("dietary", {}).get("pure_veg", False))
        ]
        
    if max_price:
        price_order = {"₹": 1, "₹₹": 2, "₹₹₹": 3, "₹₹₹₹": 4}
        max_val = price_order.get(max_price, 4)
        results = [
            r for r in results
            if price_order.get(r.get("price", "₹₹"), 2) <= max_val
        ]
        
    return results

@router.get("/{restaurant_id}")
async def get_restaurant_by_id(restaurant_id: str):
    for r in SEED_RESTAURANTS:
        if r["id"] == restaurant_id:
            return r
    raise HTTPException(status_code=404, detail="Restaurant not found")

@router.get("/{restaurant_id}/biteguide")
async def get_restaurant_biteguide(restaurant_id: str):
    for r in SEED_RESTAURANTS:
        if r["id"] == restaurant_id:
            return await generate_biteguide(
                restaurant_id=r["id"],
                restaurant_name=r["name"],
                city=r.get("city", "Mumbai"),
                restaurant_data=r
            )
    raise HTTPException(status_code=404, detail="Restaurant not found")
