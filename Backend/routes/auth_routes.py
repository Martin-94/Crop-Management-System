from flask import Blueprint

from controllers.auth_controller import (
    register,
    login,
    forgot_password,
)

auth_bp = Blueprint("auth", __name__)

auth_bp.route(
    "/register",
    methods=["POST"],
)(register)

auth_bp.route(
    "/login",
    methods=["POST"],
)(login)

auth_bp.route(
    "/forgot-password",
    methods=["POST"],
)(forgot_password)