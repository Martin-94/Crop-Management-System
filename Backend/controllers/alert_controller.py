"""
controllers/alert_controller.py
- provide alerts and notifications endpoints
"""

from flask import jsonify


def get_alerts():
    return jsonify({
        "message": "Alerts placeholder",
        "alerts": [],
        "unread_count": 0,
    })


def get_notifications():
    return jsonify({
        "message": "Notifications placeholder",
        "notifications": [],
    })
