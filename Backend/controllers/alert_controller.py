"""
controllers/alert_controller.py
- provide alerts and notifications endpoints
"""

from flask import jsonify


def get_alerts():
    alerts = [
        {
            "id": 1,
            "message": "Soil moisture is low in the north field.",
            "timestamp": "2026-08-07T09:00:00Z",
        },
        {
            "id": 2,
            "message": "Pest activity detected near the greenhouse.",
            "timestamp": "2026-08-07T08:30:00Z",
        },
    ]
    return jsonify(alerts)


def get_notifications():
    notifications = [
        {
            "id": 1,
            "message": "Watering reminder scheduled for today.",
            "timestamp": "2026-08-07T07:45:00Z",
        },
        {
            "id": 2,
            "message": "Weather alert: strong winds expected this afternoon.",
            "timestamp": "2026-08-07T06:15:00Z",
        },
    ]
    return jsonify(notifications)
