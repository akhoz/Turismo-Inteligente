from dotenv import load_dotenv
import os
import anthropic
from .prompts import SYSTEM_PROMPT

load_dotenv()

api_key = os.getenv("CLAUDE_API_KEY")

client = anthropic.Anthropic(api_key=api_key)

def ask_claude(prompt: str, model: str = "claude-opus-4-20250514") -> str:

    response = client.messages.create(
        model=model,
        max_tokens=2000,
        messages=[
            {"role": "user", "content": f"{SYSTEM_PROMPT}\n\n{prompt}"}
        ]
    )
    return response.content[0].text.strip()
