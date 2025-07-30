# backend/app/logic.py

def get_buy_signal(indicator_data: dict) -> str:
    try:
        previous_close = indicator_data["results"][0]["c"]
        open_price = indicator_data["results"][0]["o"]
        if previous_close > open_price:
            return "BUY"
        else:
            return "NO"
    except:
        return "NO"
