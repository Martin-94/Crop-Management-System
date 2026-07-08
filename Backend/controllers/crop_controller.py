"""
controllers/crop_controller.py
- provide crop management endpoints
"""

from flask import jsonify


def get_crops():
    return jsonify({
        "message": "Crops list placeholder",
        "crops": [],
    })


def get_crop_details(id):
    return jsonify({
        "message": "Crop details placeholder",
        "crop_id": id,
        "crop": None,
    })
