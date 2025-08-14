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
    rsi_data = client.get_rsi(ticker=ticker, timespan=timespan, window=14, series_type="close", order="desc", limit=1)


    # Extract latest values
    rsi_value = rsi_data.values[0].value



    # Return structured result
    return {
        "ticker": ticker,
        "rsi": rsi_value
    }
