# backend/app/main.py

from fastapi import FastAPI
from app.polygon_client import get_indicator_data
from app.logic import get_buy_signal
from app.openai_client import generate_report

app = FastAPI()

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
    price_data = get_crypto_data(symbol)
    report = generate_report(symbol, price_data)
    return {
        "symbol": symbol,
        "report": report
    }
