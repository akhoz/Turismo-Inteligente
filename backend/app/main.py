from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .routes.opengpt import router as prompt_router
from .routes import gemini
from .routes import claude


def create_app():
    app = FastAPI(
        title="GPT Vadi API",
        version="0.1.0",
        description="Backend"
    )

    # CORS
    origins = ["http://localhost", "http://localhost:5173", "https://gptprototype-front.onrender.com"]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/")
    async def root():
        return JSONResponse(content={"message": "Vadi GPT API Provider"})

    # Routers
    app.include_router(gemini.router)
    app.include_router(prompt_router)
    app.include_router(claude.router)
    
    return app
app = create_app()

