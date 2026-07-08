"""
controllers/livestock_controller.py
- provide livestock management endpoints
"""

from flask import jsonify


def get_livestock():
    return jsonify({
        "message": "Livestock list placeholder",
        "livestock": [],
    })


def get_livestock_details(id):
    return jsonify({
        "message": "Livestock details placeholder",
        "livestock_id": id,
        "animal": None,
    })
