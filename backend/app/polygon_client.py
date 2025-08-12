# backend/app/polygon_client.py

import os
import requests
from dotenv import load_dotenv
from polygon import RESTClient
from datetime import datetime
from datetime import timedelta

load_dotenv()
API_KEY = os.getenv("POLYGON_API_KEY")
client = RESTClient(API_KEY)
    


def get_indicator_data(symbol: str, timespan="minute"):

    ticker = f'X:{symbol.upper()}USD'

    # Fetch indicators
    ema_data = client.get_ema(ticker=ticker, timespan=timespan, window=20, series_type="close", order="desc", limit=1)
    today = datetime.now()
    yesterday = today - timedelta(days=1)

    snapshot_data = []
    for a in client.list_aggs(
        ticker,
        1,
        "minute",
        yesterday,
        today,
        adjusted="true",
        sort="desc",
        limit=2,
    ):
        snapshot_data.append(a)

    # Extract latest values
    ema_value = ema_data.values[0].value
    latest_price = snapshot_data[0].results[0].c
    
    



    # Return structured result
    return {
        "ticker": ticker,
        "ema": ema_value,
        "price": latest_price
    }
