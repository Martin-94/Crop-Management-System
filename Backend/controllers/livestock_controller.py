"""
controllers/livestock_controller.py
- provide livestock management endpoints
"""

from flask import jsonify

from database import get_livestock as db_get_livestock, get_livestock_item as db_get_livestock_item
from validation import not_found


def get_livestock():
    livestock = [dict(row) for row in db_get_livestock()]
    return jsonify({
        "message": "Livestock fetched successfully",
        "livestock": livestock,
    })


def get_livestock_details(id):
    animal = db_get_livestock_item(id)
    if not animal:
        return not_found("Livestock item not found")

    return jsonify({
        "message": "Livestock details fetched successfully",
        "animal": dict(animal),
    })
