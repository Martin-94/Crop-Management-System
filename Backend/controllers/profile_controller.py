"""
controllers/profile_controller.py
- provide user profile endpoints
"""

from flask import request, jsonify

from database import get_profile as db_get_profile, update_profile as db_update_profile
from validation import bad_request

USER_ID = 1


def get_profile():
    profile = db_get_profile(USER_ID)
    if not profile:
        return jsonify({
            "message": "Profile data placeholder",
            "profile": {
                "id": USER_ID,
                "username": None,
                "email": None,
                "bio": "",
                "location": "",
            },
        })

    return jsonify({
        "message": "Profile data fetched successfully",
        "profile": {
            "id": USER_ID,
            "bio": profile["bio"],
            "location": profile["location"],
        },
    })


def update_profile():
    data = request.json or {}
    bio = data.get("bio", "")
    location = data.get("location", "")

    if not isinstance(bio, str) or not isinstance(location, str):
        return bad_request("bio and location must be strings")

    db_update_profile(USER_ID, bio, location)
    return jsonify({
        "message": "Profile updated successfully",
        "profile": {
            "bio": bio,
            "location": location,
        },
    })
