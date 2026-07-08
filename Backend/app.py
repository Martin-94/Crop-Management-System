"""
app.py
- initialize Flask application
- configure JSON parsing and route registration
- export the app object for running the server
"""

from flask import Flask
from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.crop_routes import crop_bp
from routes.livestock_routes import livestock_bp
from routes.weather_routes import weather_bp
from routes.finance_routes import finance_bp
from routes.alert_routes import alert_bp
from routes.settings_routes import settings_bp
from routes.profile_routes import profile_bp

app = Flask(__name__)

app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(dashboard_bp, url_prefix="/api")
app.register_blueprint(crop_bp, url_prefix="/api")
app.register_blueprint(livestock_bp, url_prefix="/api")
app.register_blueprint(weather_bp, url_prefix="/api")
app.register_blueprint(finance_bp, url_prefix="/api")
app.register_blueprint(alert_bp, url_prefix="/api")
app.register_blueprint(settings_bp, url_prefix="/api")
app.register_blueprint(profile_bp, url_prefix="/api")

@app.route("/")
def health_check():
    return {"message": "Farm Management API Running"}
