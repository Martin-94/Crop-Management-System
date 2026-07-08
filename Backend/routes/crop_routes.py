from flask import Blueprint
from controllers.crop_controller import get_crops, get_crop_details

crop_bp = Blueprint("crop", __name__)

crop_bp.route("/crops", methods=["GET"])(get_crops)
crop_bp.route("/crops/<int:id>", methods=["GET"])(get_crop_details)
