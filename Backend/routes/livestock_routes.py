from flask import Blueprint
from controllers.livestock_controller import get_livestock, get_livestock_details

livestock_bp = Blueprint("livestock", __name__)

livestock_bp.route("/livestock", methods=["GET"])(get_livestock)
livestock_bp.route("/livestock/<int:id>", methods=["GET"])(get_livestock_details)
