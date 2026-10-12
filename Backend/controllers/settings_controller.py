"""
controllers/settings_controller.py
- fetch and update user settings
"""

from flask import request, jsonify

from database import (
    get_settings as db_get_settings,
    update_settings as db_update_settings,
)
from validation import bad_request


def get_settings():
    user_id = request.args.get(
        "userId",
        type=int,
    )

    if not user_id:
        return bad_request("userId is required")

    settings = db_get_settings(user_id)

    if not settings:
        return jsonify(
            {
                "message": "Default settings returned",
                "settings": {
                    "weatherAlerts": True,
                    "pestAlerts": True,
                    "waterAlerts": True,
                    "offlineMode": False,
                    "lowDataUsage": False,
                },
            }
        ), 200

    return jsonify(
        {
            "message": "Settings fetched successfully",
            "settings": {
                "weatherAlerts": bool(
                    settings["weather_alerts"]
                ),
                "pestAlerts": bool(
                    settings["pest_alerts"]
                ),
                "waterAlerts": bool(
                    settings["water_alerts"]
                ),
                "offlineMode": bool(
                    settings["offline_mode"]
                ),
                "lowDataUsage": bool(
                    settings["low_data_usage"]
                ),
            },
        }
    ), 200


def update_settings():
    data = request.get_json(silent=True) or {}

    required_fields = [
        "userId",
        "weatherAlerts",
        "pestAlerts",
        "waterAlerts",
        "offlineMode",
        "lowDataUsage",
    ]

    missing_fields = [
        field
        for field in required_fields
        if field not in data
    ]

    if missing_fields:
        return bad_request(
            "Missing fields: "
            + ", ".join(missing_fields)
        )

    user_id = data["userId"]

    if not isinstance(user_id, int):
        return bad_request(
            "userId must be an integer"
        )

    setting_names = [
        "weatherAlerts",
        "pestAlerts",
        "waterAlerts",
        "offlineMode",
        "lowDataUsage",
    ]

    for setting_name in setting_names:
        if not isinstance(data[setting_name], bool):
            return bad_request(
                f"{setting_name} must be boolean"
            )

    db_update_settings(
        user_id=user_id,
        weather_alerts=data["weatherAlerts"],
        pest_alerts=data["pestAlerts"],
        water_alerts=data["waterAlerts"],
        offline_mode=data["offlineMode"],
        low_data_usage=data["lowDataUsage"],
    )

    return jsonify(
        {
            "message": "Settings updated successfully",
            "settings": {
                "weatherAlerts": data["weatherAlerts"],
                "pestAlerts": data["pestAlerts"],
                "waterAlerts": data["waterAlerts"],
                "offlineMode": data["offlineMode"],
                "lowDataUsage": data["lowDataUsage"],
            },
        }
    ), 200