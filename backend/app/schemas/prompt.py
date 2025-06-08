from pydantic import BaseModel, Field

class PromptRequest(BaseModel):
    prompt: str

class PromptResponse(BaseModel):
    results: str
