from flask import Blueprint, request, jsonify

from controllers.category_controller import (
    create_category,
    get_categories,
    get_category_by_id,
    update_category,
    delete_category
)

from middleware.auth_middleware import token_required

category_bp = Blueprint("category", __name__)

@category_bp.route("/kategori", methods=["POST"])
@token_required
def create():

    data = request.get_json()

    return jsonify(create_category(data))

@category_bp.route("/kategori", methods=["GET"])
@token_required
def get_all():

    return jsonify(get_categories())

@category_bp.route("/kategori/<int:id>", methods=["GET"])
@token_required
def get_one(id):

    return jsonify(get_category_by_id(id))

@category_bp.route("/kategori/<int:id>", methods=["PUT"])
@token_required
def update(id):

    data = request.get_json()

    return jsonify(update_category(id, data))

@category_bp.route("/kategori/<int:id>", methods=["DELETE"])
@token_required
def delete(id):

    return jsonify(delete_category(id))
