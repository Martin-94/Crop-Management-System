"""
controllers/profile_controller.py
- provide user profile endpoints
"""

from flask import request, jsonify

from database import (
    get_profile as db_get_profile,
    update_profile as db_update_profile,
)
from validation import bad_request


PROFILE_FIELDS = [
    "name",
    "surname",
    "farmName",
    "phone",
    "address",
    "cropType",
    "language",
]


def get_profile():
    user_id = request.args.get(
        "userId",
        type=int,
    )

    if not user_id:
        return bad_request("userId is required")

    profile = db_get_profile(user_id)

    if not profile:
        return bad_request("User not found")

    return jsonify(
        {
            "message": "Profile fetched successfully",
            "profile": {
                "name": profile["name"] or "",
                "surname": profile["surname"] or "",
                "farmName": profile["farmName"] or "",
                "phone": profile["phoneNumber"] or "",
                "address": profile["address"] or "",
                "cropType": profile["farmType"] or "",
                "language": profile["language"] or "",
            },
        }
    ), 200


def update_profile():
    data = request.get_json(silent=True) or {}

    user_id = data.get("userId")

    if not isinstance(user_id, int):
        return bad_request(
            "userId must be an integer"
        )

    for field in PROFILE_FIELDS:
        if field not in data:
            return bad_request(
                f"{field} is required"
            )

        if not isinstance(data[field], str):
            return bad_request(
                f"{field} must be a string"
            )

    existing_profile = db_get_profile(user_id)

    if not existing_profile:
        return bad_request("User not found")

    profile_data = {
        "name": data["name"].strip(),
        "surname": data["surname"].strip(),
        "farmName": data["farmName"].strip(),
        "phone": data["phone"].strip(),
        "address": data["address"].strip(),
        "cropType": data["cropType"].strip(),
        "language": data["language"].strip(),
    }

    db_update_profile(
        user_id=user_id,
        name=profile_data["name"],
        surname=profile_data["surname"],
        phone=profile_data["phone"],
        address=profile_data["address"],
        crop_type=profile_data["cropType"],
        farm_name=profile_data["farmName"],
        language=profile_data["language"],
    )

    return jsonify(
        {
            "message": "Profile updated successfully",
            "profile": profile_data,
        }
    ), 200