from flask import Blueprint
from controllers.settings_controller import get_settings, update_settings

settings_bp = Blueprint("settings", __name__)

settings_bp.route("/settings", methods=["GET"])(get_settings)
settings_bp.route("/settings", methods=["PUT"])(update_settings)
