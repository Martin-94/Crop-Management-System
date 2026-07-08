from flask import Blueprint
from controllers.dashboard_controller import get_dashboard

dashboard_bp = Blueprint("dashboard", __name__)

dashboard_bp.route("/dashboard", methods=["GET"])(get_dashboard)
