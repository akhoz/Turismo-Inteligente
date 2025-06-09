from fastapi import APIRouter, HTTPException, status
from app.schemas.prompt import PromptRequest, PromptResponse
from app.utils.gemini import ask_gemini
from app.utils.response_parser import parse_response_with_coordinates
import anyio

router = APIRouter(
    prefix="/api/gemini",
    tags=["gemini"],
)

@router.post("", response_model=PromptResponse)
async def gemini_endpoint(req: PromptRequest):
    try:
        ai_text = await anyio.to_thread.run_sync(ask_gemini, req.prompt)
        return {"results": ai_text}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Error al llamar a Gemini: {e}"
        )

@router.post("/parsed", response_model=dict)
async def gemini_parsed_endpoint(req: PromptRequest):
    try:
        ai_text = await anyio.to_thread.run_sync(ask_gemini, req.prompt)
        parsed = parse_response_with_coordinates(ai_text)
        print(parsed)
        return parsed
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Error al llamar a Gemini (parseado): {e}"
        )

