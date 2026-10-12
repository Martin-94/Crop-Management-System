from flask import Blueprint
from controllers.finance_controller import get_income_expenses, get_finance_summary

finance_bp = Blueprint("finance", __name__)

finance_bp.route("/finance", methods=["GET"])(get_income_expenses)
finance_bp.route("/finance/summary", methods=["GET"])(get_finance_summary)
