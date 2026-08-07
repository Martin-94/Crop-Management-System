"""
controllers/settings_controller.py
- provide user settings endpoints
"""

from flask import request, jsonify

from database import get_settings as db_get_settings, update_settings as db_update_settings
from validation import bad_request

USER_ID = 1


def get_settings():
    settings = db_get_settings(USER_ID)
    if not settings:
        return jsonify({
            "message": "Settings data placeholder",
            "settings": {
                "notifications": True,
                "timezone": "UTC",
            },
        })

    return jsonify({
        "message": "Settings fetched successfully",
        "settings": {
            "notifications": bool(settings["notifications"]),
            "timezone": settings["timezone"],
        },
    })


def update_settings():
    data = request.json or {}
    notifications = data.get("notifications")
    timezone = data.get("timezone")

    if not isinstance(notifications, bool) or not isinstance(timezone, str):
        return bad_request("notifications must be boolean and timezone must be a string")

    db_update_settings(USER_ID, int(notifications), timezone)
    return jsonify({
        "message": "Settings updated successfully",
        "settings": {
            "notifications": notifications,
            "timezone": timezone,
        },
    })
