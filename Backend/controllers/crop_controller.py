"""
controllers/crop_controller.py
- provide crop management endpoints
"""

from flask import jsonify

from database import get_crops as db_get_crops, get_crop as db_get_crop
from validation import not_found


def get_crops():
    crops = [dict(row) for row in db_get_crops()]
    return jsonify({
        "message": "Crops fetched successfully",
        "crops": crops,
    })


def get_crop_details(id):
    crop = db_get_crop(id)
    if not crop:
        return not_found("Crop not found")

    return jsonify({
        "message": "Crop details fetched successfully",
        "crop": dict(crop),
    })
