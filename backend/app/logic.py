def get_buy_signal(indicator_data: dict) -> dict:
    '''Return buy signal and strength score (0–5) based on RSI value.'''

    rsi = indicator_data.get("rsi")

    if rsi is None:
        return {"signal": "NO", "score": 0}

    # Scoring based on custom RSI zones
    score = 0
    if rsi < 10:
        score += 2
    elif 10 <= rsi <= 20:
        score += 3
    elif 21 <= rsi <= 26:
        score += 4
    elif 27 <= rsi <= 40:
        score += 5
    elif 41 <= rsi <= 51:
        score += 4
    elif 52 <= rsi <= 60:
        score += 3
    elif 61 <= rsi <= 70:
        score = +2
    else:  # rsi > 70
        score = +1

    signal = "BUY" if score >= 3 else "AVOID"

    return {"signal": signal, "score": score}
