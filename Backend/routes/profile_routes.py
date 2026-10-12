from flask import Blueprint
from controllers.profile_controller import get_profile, update_profile

profile_bp = Blueprint("profile", __name__)

profile_bp.route("/profile", methods=["GET"])(get_profile)
profile_bp.route("/profile", methods=["PUT"])(update_profile)
