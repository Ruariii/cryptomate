# backend/app/openai_client.py

from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_report(symbol: str, indicator_data: dict) -> str:
    prompt = f"""
    Provide a concise summary of the recent performance of the cryptocurrency {symbol}.
    Here is the latest key indicator data: {indicator_data}.
    Give an analysis of whether it is a good time to buy based on the data provided. Explain your reasoning.
    """

    response = client.chat.completions.create(
        model="gpt-4.1-mini", 
        messages=[
            {"role": "system", "content": "You are a helpful financial analyst."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
        max_tokens=150,
    )

    return response.choices[0].message.content.strip()
