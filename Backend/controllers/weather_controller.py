"""
controllers/weather_controller.py
- provide weather display endpoint
"""

from flask import jsonify


def get_weather():
    return jsonify({
        "message": "Weather data placeholder",
        "weather": {
            "temperature": None,
            "condition": "Unknown",
            "forecast": [],
        },
    })
