from fastapi import APIRouter, HTTPException, status, Request
from ..schemas.prompt import PromptRequest, PromptResponse
from ..utils.claude import ask_claude
from ..utils.response_parser import parse_response_with_coordinates
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

@router.post("/parsed", response_model=dict)
async def claude_parsed_endpoint(req: PromptRequest):
    try:
        ai_text = await anyio.to_thread.run_sync(ask_claude, req.prompt)
        parsed = parse_response_with_coordinates(ai_text)
        print(parsed)
        return parsed
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Error al llamar a Claude (parseado): {e}"
        )