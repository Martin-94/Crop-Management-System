"""
controllers/dashboard_controller.py
- provide dashboard data for the main application screen
"""

from flask import jsonify

from database import get_dashboard_stats


def get_dashboard():
    return jsonify({
        "message": "Dashboard data fetched successfully",
        "stats": get_dashboard_stats(),
    })
