"""
controllers/alert_controller.py
- provide alerts and notifications endpoints
"""

from flask import jsonify

from database import get_alerts as db_get_alerts, get_notifications as db_get_notifications


def get_alerts():
    alerts = [dict(row) for row in db_get_alerts()]
    return jsonify({
        "message": "Alerts fetched successfully",
        "alerts": alerts,
    })


def get_notifications():
    notifications = [dict(row) for row in db_get_notifications()]
    return jsonify({
        "message": "Notifications fetched successfully",
        "notifications": notifications,
    })
