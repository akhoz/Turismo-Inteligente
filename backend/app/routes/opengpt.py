from fastapi import APIRouter, HTTPException, status, Request
from ..schemas.prompt import PromptRequest, PromptResponse
from ..utils.chatgpt import ask_chatgpt
from app.utils.response_parser import parse_response_with_coordinates
import anyio

router = APIRouter(
    prefix="/api/openai",
    tags=["openai"],
)

@router.post("", response_model=PromptResponse)
async def openai_endpoint(req: PromptRequest, raw: Request):
    try:
        ai_text = await anyio.to_thread.run_sync(ask_chatgpt, req.prompt)
        return {"results": ai_text}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Error al llamar a OpenAI: {e}"
        )

@router.post("/parsed", response_model=dict)
async def openai_parsed_endpoint(req: PromptRequest):
    try:
        ai_text = await anyio.to_thread.run_sync(ask_chatgpt, req.prompt)
        parsed = parse_response_with_coordinates(ai_text)
        return parsed
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Error al llamar a OpenAI (parseado): {e}"
        )