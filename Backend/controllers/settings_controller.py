"""
controllers/settings_controller.py
- provide user settings endpoints
"""

from flask import request, jsonify


def get_settings():
    return jsonify({
        "message": "Settings placeholder",
        "settings": {
            "notifications": True,
            "timezone": "UTC",
        },
    })


def update_settings():
    data = request.json
    return jsonify({
        "message": "Settings update placeholder",
        "updated": data,
    })
