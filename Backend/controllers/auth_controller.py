"""
controllers/auth_controller.py
- handle user authentication
- register and login endpoints
"""

from flask import request, jsonify


def register():
    data = request.json
    return jsonify({
        "message": "User registration placeholder",
        "data": data,
    }), 201


def login():
    data = request.json
    return jsonify({
        "message": "Login placeholder",
        "token": "example-token",
        "data": data,
    })
