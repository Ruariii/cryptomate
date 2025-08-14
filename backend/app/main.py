# backend/app/main.py

from fastapi import FastAPI
from app.polygon_client import get_indicator_data
from app.logic import get_buy_signal
from app.openai_client import generate_report
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for testing; restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/crypto/{symbol}")
def crypto_info(symbol: str):
    indicator_data = get_indicator_data(symbol)
    decision = get_buy_signal(indicator_data)
    return {
        "symbol": symbol,
        "price": indicator_data,
        "action": decision
    }

@app.get("/crypto/{symbol}/report")
def crypto_report(symbol: str):
    indicator_data = get_indicator_data(symbol)
    decision = get_buy_signal(indicator_data)
    report = generate_report(symbol, indicator_data=indicator_data, decision=decision)
    return {
        "symbol": symbol,
        "decision": decision,
        "report": report
    }
