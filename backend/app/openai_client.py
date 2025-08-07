# backend/app/openai_client.py

from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_report(symbol: str, indicator_data: dict, decision: dict) -> str:
    prompt = f"""
    Provide a concise summary of the recent performance of the cryptocurrency {symbol}.
    Here is the latest key indicator data: {indicator_data}.
    The decision based on this data is: {decision}.

    Analyze the indicators and decision to determine if it is a good time to buy {symbol}.
    Include the following in your report:
    - RSI (Relative Strength Index)
    - Overall market sentiment
    - Decision score and reasoning

    The report should be less than 250 characters and clear, informative, and suitable for someone looking to make an investment decision.
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
