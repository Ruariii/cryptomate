# backend/app/polygon_client.py

import os
import requests
from dotenv import load_dotenv
from polygon import RESTClient

load_dotenv()
API_KEY = os.getenv("POLYGON_API_KEY")
client = RESTClient(API_KEY)


def parse_macd_response(macd_data):
    try:
        latest = macd_data["results"]["values"][0]  # Most recent data
        macd_value = latest["value"]
        signal_line = latest["signal"]
        histogram = latest["histogram"]

        return {
            "macd": round(macd_value, 4),
            "signal": round(signal_line, 4),
            "histogram": round(histogram, 4),
            "trend": "uptrend" if macd_value > signal_line else "downtrend"
        }

    except (KeyError, IndexError, TypeError):
        return {
            "macd": None,
            "signal": None,
            "histogram": None,
            "trend": "unknown"
        }
    


def get_indicator_summary(ticker="X:BTCUSD", timespan="hour"):
    # Fetch indicators
    ema_data = client.get_ema(ticker=ticker, timespan=timespan, window="50", series_type="close", order="desc", limit=1)
    macd_data = client.get_macd(ticker=ticker, timespan=timespan, short_window=12, long_window=26, signal_window=9, series_type="close", order="desc", limit=1)
    rsi_data = client.get_rsi(ticker=ticker, timespan=timespan, window=14, series_type="close", order="desc", limit=1)

    # Extract latest values
    ema_value = ema_data.results[0]['value']
    macd = macd_data.results[0]
    macd_value = macd["value"]
    signal_line = macd["signal"]
    histogram = macd["histogram"]
    rsi_value = rsi_data.results[0]["value"]

    # Interpret signals
    trend = "uptrend" if macd_value > signal_line else "downtrend"
    rsi_status = (
        "overbought" if rsi_value > 70 else
        "oversold" if rsi_value < 30 else
        "neutral"
    )

    # Return structured result
    return {
        "ticker": ticker,
        "ema": round(ema_value, 2),
        "macd": round(macd_value, 4),
        "macd_signal": round(signal_line, 4),
        "macd_hist": round(histogram, 4),
        "rsi": round(rsi_value, 2),
        "trend": trend,
        "rsi_status": rsi_status,
    }
