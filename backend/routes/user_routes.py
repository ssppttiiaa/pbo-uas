from flask import Blueprint, request, jsonify
from controllers.user_controller import (
    get_profile,
    update_profile,
    delete_profile
)
from middleware.auth_middleware import token_required

user_bp = Blueprint("user", __name__)


@user_bp.route("/profile", methods=["GET"])
@token_required
def profile():
    result = get_profile()

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 400


@user_bp.route("/profile", methods=["PUT"])
@token_required
def update():
    data = request.get_json()
    result = update_profile(data)

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 400


@user_bp.route("/profile", methods=["DELETE"])
@token_required
def delete():
    result = delete_profile()

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 400