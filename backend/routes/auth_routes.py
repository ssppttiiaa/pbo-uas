from flask import Blueprint, request, jsonify
from controllers.auth_controller import register_user, login_user

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    result = register_user(data)

    if result["success"]:
        return jsonify(result), 201  # Created

    return jsonify(result), 400  # Bad Request


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    result = login_user(data)

    if result["success"]:
        return jsonify(result), 200  # OK

    return jsonify(result), 401  # Unauthorized