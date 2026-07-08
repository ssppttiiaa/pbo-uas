from flask import Blueprint, request, jsonify

from controllers.saving_controller import (
    create_saving,
    get_savings,
    get_saving_by_id,
    update_saving,
    delete_saving
)

from middleware.auth_middleware import token_required

saving_bp = Blueprint("saving", __name__)


@saving_bp.route("/target", methods=["POST"])
@token_required
def create():
    return jsonify(create_saving(request.get_json()))


@saving_bp.route("/target", methods=["GET"])
@token_required
def get_all():
    return jsonify(get_savings())


@saving_bp.route("/target/<int:id>", methods=["GET"])
@token_required
def get_one(id):
    return jsonify(get_saving_by_id(id))


@saving_bp.route("/target/<int:id>", methods=["PUT"])
@token_required
def update(id):
    return jsonify(update_saving(id, request.get_json()))


@saving_bp.route("/target/<int:id>", methods=["DELETE"])
@token_required
def delete(id):
    return jsonify(delete_saving(id))