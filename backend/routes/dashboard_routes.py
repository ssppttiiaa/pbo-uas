from flask import Blueprint, jsonify
from controllers.dashboard_controller import dashboard
from middleware.auth_middleware import token_required

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/dashboard", methods=["GET"])
@token_required
def get_dashboard():
    return jsonify(dashboard())