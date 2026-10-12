"""
Validation utility functions for the Crop Management System API.
Provides functions to handle common validation tasks such as:
- Generating standardized error responses for bad requests, not found resources, and unauthorized access.
- Validating request payloads to ensure required fields are present."""

from flask import jsonify


def bad_request(message: str):
    response = jsonify({
        "error": "bad_request",
        "message": message,
    })
    response.status_code = 400
    return response


def not_found(message: str):
    response = jsonify({
        "error": "not_found",
        "message": message,
    })
    response.status_code = 404
    return response


def unauthorized(message: str):
    response = jsonify({
        "error": "unauthorized",
        "message": message,
    })
    response.status_code = 401
    return response


def validate_payload(required_fields: list[str], payload: dict):
    missing = [field for field in required_fields if field not in payload]
    if missing:
        return False, f"Missing required fields: {', '.join(missing)}"
    return True, None
