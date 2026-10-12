"""
controllers/auth_controller.py
- handle user authentication
- register and login endpoints
"""
 
from flask import request, jsonify
 
from flask import request, jsonify

from database import (
    create_user,
    get_user_by_username,
    get_user_by_email,
    update_user_password,
    verify_password,
)

from validation import (
    bad_request,
    unauthorized,
    validate_payload,
)

 
 
def register():
    payload = request.json or {}
 
    required_fields = [
        "name",
        "surname",
        "email",
        "username",
        "password",
        "farmType",
        "phoneNumber",
        "address",
    ]
 
    valid, error = validate_payload(
        required_fields,
        payload,
    )
 
    if not valid:
        return bad_request(error)
 
    if get_user_by_username(payload["username"]):
        return bad_request(
            "Username already exists"
        )
 
    user_id = create_user(
        name=payload["name"],
        surname=payload["surname"],
        email=payload["email"],
        username=payload["username"],
        password=payload["password"],
        farmType=payload["farmType"],
        phoneNumber=payload["phoneNumber"],
        address=payload["address"],
    )
 
    return jsonify(
        {
            "message": "User created successfully",
            "user_id": user_id,
        }
    ), 201
 
 
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
 
def forgot_password():
    payload = request.get_json(silent=True) or {}

    valid, error = validate_payload(
        ["email", "newPassword"],
        payload,
    )

    if not valid:
        return bad_request(error)

    email = payload["email"].strip()
    new_password = payload["newPassword"]

    user = get_user_by_email(email)

    if not user:
        return bad_request(
            "Email address not found"
        )

    if len(new_password) < 8:
        return bad_request(
            "Password must be at least 8 characters"
        )

    update_user_password(
        email,
        new_password,
    )

    return jsonify(
        {
            "message": "Password updated successfully",
            "email": email,
        }
    ), 200