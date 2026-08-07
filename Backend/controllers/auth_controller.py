"""
controllers/auth_controller.py
- handle user authentication
- register and login endpoints
"""

from flask import request, jsonify

from database import create_user, get_user_by_username, verify_password
from validation import bad_request, unauthorized, validate_payload


def register():
    payload = request.json or {}
    valid, error = validate_payload(["username", "email", "password"], payload)
    if not valid:
        return bad_request(error)

    if get_user_by_username(payload["username"]):
        return bad_request("Username already exists")

    user_id = create_user(payload["username"], payload["email"], payload["password"])
    return jsonify({
        "message": "User created successfully",
        "user_id": user_id,
    }), 201


def login():
    payload = request.json or {}
    valid, error = validate_payload(["username", "password"], payload)
    if not valid:
        return bad_request(error)

    user = get_user_by_username(payload["username"])
    if not user or not verify_password(payload["password"], user["password_hash"]):
        return unauthorized("Invalid username or password")

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
        },
    })
