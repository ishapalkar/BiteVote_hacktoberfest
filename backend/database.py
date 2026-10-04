import logging
from typing import Optional, Dict, Any
from datetime import datetime
from pymongo import AsyncMongoClient
from backend.config import settings

logger = logging.getLogger("bitevote.db")

class Database:
    client: Optional[AsyncMongoClient] = None
    db = None
    _in_memory_rooms: Dict[str, Dict[str, Any]] = {}
    is_connected: bool = False

    async def connect(self):
        if settings.MONGODB_URI:
            try:
                logger.info("Connecting to MongoDB Atlas via PyMongo Async...")
                self.client = AsyncMongoClient(
                    settings.MONGODB_URI,
                    serverSelectionTimeoutMS=4000
                )
                self.db = self.client[settings.MONGODB_DB_NAME]
                await self.client.admin.command('ping')
                self.is_connected = True
                logger.info(f"Successfully connected to MongoDB Atlas database '{settings.MONGODB_DB_NAME}' via PyMongo Async.")
                
                # Ensure unique index on room code
                await self.db.rooms.create_index("code", unique=True)
            except Exception as e:
                logger.warning(f"MongoDB Atlas connection failed: {e}. Falling back to in-memory room store.")
                self.is_connected = False
        else:
            logger.info("MONGODB_URI not set. Using in-memory room store. (Set MONGODB_URI to persist to MongoDB Atlas via PyMongo Async)")
            self.is_connected = False

    async def disconnect(self):
        if self.client:
            await self.client.close()
            logger.info("MongoDB Atlas PyMongo Async connection closed.")

    async def get_room(self, code: str) -> Optional[Dict[str, Any]]:
        code = code.upper().strip()
        if self.is_connected and self.db is not None:
            try:
                room = await self.db.rooms.find_one({"code": code}, {"_id": 0})
                return room
            except Exception as e:
                logger.error(f"Error fetching room {code} from MongoDB Atlas: {e}")
        return self._in_memory_rooms.get(code)

    async def save_room(self, room_data: Dict[str, Any]) -> None:
        code = room_data["code"].upper().strip()
        room_data["updated_at"] = datetime.utcnow().isoformat()
        self._in_memory_rooms[code] = room_data
        
        if self.is_connected and self.db is not None:
            try:
                await self.db.rooms.replace_one({"code": code}, room_data, upsert=True)
            except Exception as e:
                logger.error(f"Error persisting room {code} to MongoDB Atlas: {e}")

    async def ping(self) -> Dict[str, Any]:
        if self.is_connected and self.client is not None:
            try:
                await self.client.admin.command('ping')
                return {"status": "connected", "type": "MongoDB Atlas (PyMongo Async)", "db_name": settings.MONGODB_DB_NAME}
            except Exception as e:
                return {"status": "disconnected", "error": str(e), "type": "InMemoryFallback"}
        return {"status": "active", "type": "InMemoryFallback", "note": "Add MONGODB_URI in .env to connect to MongoDB Atlas"}

db = Database()
