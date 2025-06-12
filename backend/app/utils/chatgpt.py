# app/utils/chatgpt.py

from dotenv import load_dotenv
import os
from openai import OpenAI

from .prompts import SYSTEM_PROMPT

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)

def ask_chatgpt(prompt: str, model: str = "gpt-3.5-turbo") -> str:
    resp = client.chat.completions.create(
        model=model,
        messages=[  # sin SYSTEM_PROMPT
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=2000,
    )
    return resp.choices[0].message.content.strip()

