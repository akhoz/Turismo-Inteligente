from fastapi import APIRouter, HTTPException, status, Request
from ..schemas.prompt import PromptRequest, PromptResponse
from ..utils.claude import ask_claude
import anyio

router = APIRouter(
    prefix="/api/claude",
    tags=["claude"],
)

@router.post("", response_model=PromptResponse)
async def claude_endpoint(req: PromptRequest, raw: Request):
    try:
        ai_text = await anyio.to_thread.run_sync(ask_claude, req.prompt)
        return {"results": ai_text}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Error al llamar a Claude: {e}"
        )