"""
controllers/dashboard_controller.py
- provide dashboard data for the main application screen
"""

from flask import jsonify


def get_dashboard():
    return jsonify({
        "message": "Dashboard data placeholder",
        "stats": {
            "active_crops": 0,
            "livestock_count": 0,
            "recent_alerts": 0,
            "income_this_month": 0,
            "expenses_this_month": 0,
        },
    })
