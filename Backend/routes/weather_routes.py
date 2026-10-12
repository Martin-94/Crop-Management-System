from flask import Blueprint
from controllers.weather_controller import get_weather

weather_bp = Blueprint("weather", __name__)

weather_bp.route("/weather", methods=["GET"])(get_weather)
