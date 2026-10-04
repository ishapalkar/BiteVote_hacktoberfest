import random
import string
import uuid
from typing import Optional, Dict
from fastapi import APIRouter, HTTPException
from backend.models import (
    Room, RoomCreateRequest, JoinRoomRequest, 
    Participant, UserPreferences, VoteSubmitRequest, AIDecision, DecideRoomRequest
)
from backend.database import db
from backend.restaurants_data import SEED_RESTAURANTS
from backend.ai_engine import generate_ai_compromise

router = APIRouter(prefix="/api/rooms", tags=["rooms"])

def generate_room_code() -> str:
    letters = "".join(random.choices(string.ascii_uppercase, k=4))
    digits = "".join(random.choices(string.digits, k=2))
    return f"{letters}{digits}"

@router.post("", response_model=Room)
async def create_room(req: RoomCreateRequest):
    room_code = generate_room_code()
    for _ in range(5):
        existing = await db.get_room(room_code)
        if not existing:
            break
        room_code = generate_room_code()

    host_id = str(uuid.uuid4())[:8]
    host_participant = Participant(
        id=host_id,
        name=req.host_name,
        avatar=req.host_avatar,
        is_host=True,
        is_ready=False,
        has_voted=False
    )

    # Select candidate restaurants matching city
    city_restaurants = [r["id"] for r in SEED_RESTAURANTS if r.get("city", "").lower() == req.city.lower()]
    if not city_restaurants:
        city_restaurants = [r["id"] for r in SEED_RESTAURANTS]

    room = Room(
        code=room_code,
        name=req.name,
        city=req.city,
        status="lobby",
        host_id=host_id,
        participants=[host_participant],
        restaurant_ids=city_restaurants
    )

    await db.save_room(room.model_dump())
    return room

def parse_room_dict(room_dict: dict) -> Room:
    try:
        return Room(**room_dict)
    except Exception:
        if "decision" in room_dict and isinstance(room_dict["decision"], dict):
            try:
                room_dict["decision"] = AIDecision(**room_dict["decision"]).model_dump()
            except Exception:
                room_dict["decision"] = None
        return Room(**room_dict)

@router.get("/{code}", response_model=Room)
async def get_room(code: str):
    room_dict = await db.get_room(code)
    if not room_dict:
        raise HTTPException(status_code=404, detail="Room not found. Check your 6-character room code!")
    return parse_room_dict(room_dict)

@router.post("/{code}/join", response_model=Room)
async def join_room(code: str, req: JoinRoomRequest):
    room_dict = await db.get_room(code)
    if not room_dict:
        raise HTTPException(status_code=404, detail="Room not found")
    
    room = parse_room_dict(room_dict)
    
    p_id = req.participant_id or str(uuid.uuid4())[:8]
    existing_p = next((p for p in room.participants if p.id == p_id), None)
    
    if existing_p:
        existing_p.name = req.name
        existing_p.avatar = req.avatar
    else:
        new_p = Participant(
            id=p_id,
            name=req.name,
            avatar=req.avatar,
            is_host=False,
            is_ready=False,
            has_voted=False
        )
        room.participants.append(new_p)

    await db.save_room(room.model_dump())
    return room

@router.post("/{code}/preferences", response_model=Room)
async def update_preferences(code: str, participant_id: str, prefs: UserPreferences):
    room_dict = await db.get_room(code)
    if not room_dict:
        raise HTTPException(status_code=404, detail="Room not found")
    
    room = parse_room_dict(room_dict)
    participant = next((p for p in room.participants if p.id == participant_id), None)
    if not participant:
        raise HTTPException(status_code=404, detail="Participant not found")
        
    participant.preferences = prefs
    participant.is_ready = True
    
    await db.save_room(room.model_dump())
    return room

@router.post("/{code}/status", response_model=Room)
async def update_room_status(code: str, status: str):
    if status not in ["lobby", "voting", "decided"]:
        raise HTTPException(status_code=400, detail="Invalid status")
        
    room_dict = await db.get_room(code)
    if not room_dict:
        raise HTTPException(status_code=404, detail="Room not found")
        
    room = parse_room_dict(room_dict)
    room.status = status
    await db.save_room(room.model_dump())
    return room

@router.post("/{code}/vote", response_model=Room)
async def submit_vote(code: str, req: VoteSubmitRequest):
    room_dict = await db.get_room(code)
    if not room_dict:
        raise HTTPException(status_code=404, detail="Room not found")
        
    room = parse_room_dict(room_dict)
    participant = next((p for p in room.participants if p.id == req.participant_id), None)
    if not participant:
        raise HTTPException(status_code=404, detail="Participant not found")
        
    room.votes[req.participant_id] = req.votes
    participant.has_voted = True
    
    await db.save_room(room.model_dump())
    return room

@router.post("/{code}/decide", response_model=Room)
async def decide_room(code: str, req: Optional[DecideRoomRequest] = None):
    room_dict = await db.get_room(code)
    if not room_dict:
        raise HTTPException(status_code=404, detail="Room not found")
        
    room = parse_room_dict(room_dict)
    
    # Filter candidate restaurants
    candidates = [r for r in SEED_RESTAURANTS if r["id"] in room.restaurant_ids]
    if not candidates:
        candidates = [r for r in SEED_RESTAURANTS if r.get("city", "").lower() == room.city.lower()]
    if not candidates:
        candidates = SEED_RESTAURANTS

    crave_signals = req.crave_clash if req else None
    bite_signals = req.bite_blitz if req else None

    participants_dict = [p.model_dump() for p in room.participants]
    decision = await generate_ai_compromise(
        participants_dict, 
        candidates, 
        room.votes, 
        city=room.city,
        crave_clash_signals=crave_signals,
        bite_blitz=bite_signals
    )
    
    room.decision = decision
    room.crave_clash = crave_signals
    room.bite_blitz = bite_signals
    room.status = "decided"
    
    await db.save_room(room.model_dump())
    return room

@router.post("/{code}/reset", response_model=Room)
async def reset_room(code: str):
    room_dict = await db.get_room(code)
    if not room_dict:
        raise HTTPException(status_code=404, detail="Room not found")
        
    room = Room(**room_dict)
    room.status = "lobby"
    room.votes = {}
    room.decision = None
    for p in room.participants:
        p.has_voted = False
        
    await db.save_room(room.model_dump())
    return room
