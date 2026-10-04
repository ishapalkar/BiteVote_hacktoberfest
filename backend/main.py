import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from backend.config import settings
from backend.database import db
from backend.routes.rooms import router as rooms_router
from backend.routes.restaurants import router as restaurants_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("bitevote.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting BiteVote Backend Service...")
    await db.connect()
    yield
    logger.info("Shutting down BiteVote Backend Service...")
    await db.disconnect()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI Compromise Engine for Group Dining Decisions powered by Gemma open-weight models.",
    lifespan=lifespan
)

# Setup CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(rooms_router)
app.include_router(restaurants_router)

@app.get("/api/health")
async def health_check():
    db_status = await db.ping()
    ai_mode = "Gemma 2 (API Enabled)" if settings.GEMMA_API_KEY else "Gemma 2 (Deterministic Solver Mode)"
    return {
        "status": "healthy",
        "service": "BiteVote API",
        "version": settings.VERSION,
        "database": db_status,
        "ai_engine": {
            "model": settings.GEMMA_MODEL,
            "mode": ai_mode,
            "provider": "Google Gemma 2 (Open Weights)"
        }
    }

@app.get("/api")
async def root():
    return {
        "message": "Welcome to BiteVote API — Vote. Match. Eat.",
        "description": "AI-powered group dining compromise engine powered by Google's open-weight Gemma model.",
        "docs_url": "/docs",
        "health_url": "/api/health"
    }

# Serve React static build if it exists (for single-service Render deployment)
frontend_dist = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api"):
            return None
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_dist, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
