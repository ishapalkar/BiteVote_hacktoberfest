from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field, model_validator
from datetime import datetime

class DietaryPreferences(BaseModel):
    pure_veg: bool = False       # 100% Pure Vegetarian Kitchen
    jain: bool = False           # Strict Jain (No onion, garlic, potatoes, root vegetables)
    vegetarian: bool = False     # Vegetarian friendly
    vegan: bool = False          # 100% Plant-based
    eggless: bool = False        # Eggless (crucial for bakeries and desserts)
    halal: bool = False          # Halal certified/sourced
    gluten_free: bool = False    # Gluten-free
    lactose_free: bool = False   # Dairy-free
    nut_free: bool = False       # Nut allergy safe

class UserPreferences(BaseModel):
    dietary: DietaryPreferences = Field(default_factory=DietaryPreferences)
    cravings: List[str] = Field(default_factory=list)
    dislikes: List[str] = Field(default_factory=list)
    budget_tier: str = "₹₹"      # ₹, ₹₹, ₹₹₹, ₹₹₹₹
    budget_min: int = 300        # in INR
    budget_max: int = 700        # in INR
    vibe: str = "Family Dining & Casual"
    max_distance: float = 5.0    # in km

class Participant(BaseModel):
    id: str
    name: str
    avatar: str = "food-samosa"  # Food Avatar identifier
    is_host: bool = False
    preferences: Optional[UserPreferences] = None
    is_ready: bool = False
    has_voted: bool = False
    joined_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class TradeOff(BaseModel):
    participant: str = "Friend"
    concession: str = "Flexible preference"
    gain: str = "Great group dining"

class FriendDishSuggestion(BaseModel):
    participant: str = "Friend"
    dish: str = "Chef's Special"
    price_inr: int = 250
    note: str = "Matches dining preferences"

    @model_validator(mode="before")
    @classmethod
    def map_legacy_fields(cls, data: Any) -> Any:
        if isinstance(data, dict):
            participant = (
                data.get("participant") 
                or data.get("participant_name") 
                or data.get("friend_name") 
                or "Friend"
            )
            dish = (
                data.get("dish") 
                or data.get("dish_name") 
                or data.get("order") 
                or "Chef's Special"
            )
            raw_price = data.get("price_inr") or data.get("price") or 250
            if isinstance(raw_price, str):
                digits = "".join(c for c in raw_price if c.isdigit())
                price_val = int(digits) if digits else 250
            else:
                try:
                    price_val = int(raw_price)
                except (TypeError, ValueError):
                    price_val = 250
            note = (
                data.get("note") 
                or data.get("diet_fit") 
                or data.get("why_safe") 
                or data.get("why_chosen") 
                or "Matches dietary preferences"
            )
            return {
                "participant": participant,
                "dish": dish,
                "price_inr": price_val,
                "note": note
            }
        return data

class AIDecision(BaseModel):
    winner_id: str = "mum-1"
    winner_name: str = "Recommended Place"
    winner_cuisine: str = "Multicuisine"
    city: str = "Mumbai"
    match_score: int = 90
    verdict_summary: str = "Optimal compromise spot for everyone."
    compromise_reasons: List[str] = Field(default_factory=list)
    trade_offs: List[TradeOff] = Field(default_factory=list)
    dish_suggestions: List[FriendDishSuggestion] = Field(default_factory=list)
    runner_up_id: Optional[str] = None
    runner_up_name: Optional[str] = None
    runner_up_reason: Optional[str] = None
    model_used: str = "Google Gemma 2 (Open Weights)"
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

    @model_validator(mode="before")
    @classmethod
    def handle_legacy_decision(cls, data: Any) -> Any:
        if isinstance(data, dict):
            # 1. Map legacy safe_orders or personalized_dishes if dish_suggestions missing
            if not data.get("dish_suggestions"):
                legacy_orders = (
                    data.get("safe_orders") 
                    or data.get("personalized_dishes") 
                    or data.get("dish_recommendations") 
                    or []
                )
                data["dish_suggestions"] = legacy_orders
            # 2. Normalize match_score to integer
            if "match_score" in data:
                try:
                    data["match_score"] = int(float(data["match_score"]))
                except (TypeError, ValueError):
                    data["match_score"] = 90
            # 3. Ensure list fields exist
            if "compromise_reasons" not in data or data["compromise_reasons"] is None:
                data["compromise_reasons"] = []
            if "trade_offs" not in data or data["trade_offs"] is None:
                data["trade_offs"] = []
            if "dish_suggestions" not in data or data["dish_suggestions"] is None:
                data["dish_suggestions"] = []
        return data

class RoomCreateRequest(BaseModel):
    name: str = "Friday Dinner Squad"
    host_name: str = "Host"
    host_avatar: str = "avatar-1"
    city: str = "Mumbai"
    cuisine_filter: Optional[str] = None

class JoinRoomRequest(BaseModel):
    name: str
    avatar: str = "avatar-2"
    participant_id: Optional[str] = None

class VoteSubmitRequest(BaseModel):
    participant_id: str
    votes: Dict[str, str]  # restaurant_id -> "like" | "skip" | "neutral"

class Room(BaseModel):
    code: str
    name: str
    city: str = "Mumbai"
    status: str = "lobby"  # lobby | voting | decided
    host_id: str
    participants: List[Participant] = Field(default_factory=list)
    votes: Dict[str, Dict[str, str]] = Field(default_factory=dict)
    restaurant_ids: List[str] = Field(default_factory=list)
    decision: Optional[AIDecision] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
