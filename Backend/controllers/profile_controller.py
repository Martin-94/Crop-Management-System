"""
controllers/profile_controller.py
- provide user profile endpoints
"""

from flask import request, jsonify


def get_profile():
    return jsonify({
        "message": "Profile data placeholder",
        "profile": {
            "id": None,
            "username": None,
            "email": None,
        },
    })


def update_profile():
    data = request.json
    return jsonify({
        "message": "Profile update placeholder",
        "profile": data,
    })
