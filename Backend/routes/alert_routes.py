from flask import Blueprint
from controllers.alert_controller import get_alerts, get_notifications

alert_bp = Blueprint("alerts", __name__)

alert_bp.route("/alerts", methods=["GET"])(get_alerts)
alert_bp.route("/notifications", methods=["GET"])(get_notifications)
