"""
controllers/finance_controller.py
- provide income and expense tracking endpoints
"""

from flask import jsonify


def get_income_expenses():
    return jsonify({
        "message": "Income and expenses placeholder",
        "income": [],
        "expenses": [],
        "totals": {
            "income": 0,
            "expenses": 0,
            "balance": 0,
        },
    })


def get_finance_summary():
    return jsonify({
        "message": "Finance summary placeholder",
        "summary": {
            "monthly_income": 0,
            "monthly_expenses": 0,
            "savings": 0,
        },
    })
