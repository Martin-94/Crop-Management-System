"""
controllers/finance_controller.py
- provide income and expense tracking endpoints
"""

from flask import jsonify

from database import get_income, get_expenses, get_finance_summary


def get_income_expenses():
    income = [dict(row) for row in get_income()]
    expenses = [dict(row) for row in get_expenses()]
    return jsonify({
        "message": "Income and expenses fetched successfully",
        "income": income,
        "expenses": expenses,
        "totals": get_finance_summary(),
    })


def get_finance_summary():
    return jsonify({
        "message": "Finance summary fetched successfully",
        "summary": get_finance_summary(),
    })
