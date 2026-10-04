import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = "BiteVote API (India Edition)"
    VERSION: str = "2.1.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # MongoDB Atlas Database (PyMongo Async)
    MONGODB_URI: str = os.getenv("MONGODB_URI", "")
    MONGODB_DB_NAME: str = os.getenv("MONGODB_DB_NAME", "bitevote")
    
    # Production AI: Google Gemma 2 via OpenRouter
    GEMMA_API_KEY: str = os.getenv("GEMMA_API_KEY", "")
    GEMMA_API_BASE: str = os.getenv("GEMMA_API_BASE", "https://openrouter.ai/api/v1")
    GEMMA_MODEL: str = os.getenv("GEMMA_MODEL", "google/gemma-2-27b-it")
    
    # Server / Render
    PORT: int = int(os.getenv("PORT", 8000))
    CORS_ORIGINS: list[str] = ["*"]

settings = Settings()
