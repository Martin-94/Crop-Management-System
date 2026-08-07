"""
controllers/weather_controller.py
- provide weather display endpoint
"""

import json
import os
from typing import Any
from urllib import parse, request as urllib_request

from flask import jsonify, request


WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_weather():
    city = request.args.get("city", "Nairobi").strip()

    if not city:
        city = "Nairobi"

    payload: dict[str, Any] = {
        "q": city,
        "appid": WEATHER_API_KEY,
        "units": "metric",
    }

    if not WEATHER_API_KEY:
        return jsonify({
            "city": city,
            "temperature": None,
            "condition": "Unknown",
            "forecast": [],
            "message": "Weather API key not configured. Add WEATHER_API_KEY to your environment to enable live weather data.",
        }), 200

    try:
        query_string = parse.urlencode(payload)
        url = f"{WEATHER_API_BASE_URL}?{query_string}"
        with urllib_request.urlopen(url, timeout=10) as response:
            data = json.loads(response.read().decode("utf-8"))

        return jsonify({
            "city": data.get("name", city),
            "temperature": data.get("main", {}).get("temp"),
            "condition": data.get("weather", [{}])[0].get("description", "Unknown"),
            "forecast": [
                {
                    "day": "Today",
                    "condition": data.get("weather", [{}])[0].get("description", "Unknown"),
                    "temperature": data.get("main", {}).get("temp"),
                }
            ],
            "message": "Weather data fetched successfully",
        }), 200
    except Exception:
        return jsonify({
            "city": city,
            "temperature": None,
            "condition": "Unknown",
            "forecast": [],
            "message": "Unable to fetch weather data right now.",
        }), 200
