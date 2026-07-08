from flask import Blueprint, request, jsonify

from controllers.transaction_controller import (
    create_transaction,
    get_transactions,
    get_transaction_by_id,
    update_transaction,
    delete_transaction
)

from middleware.auth_middleware import token_required

transaction_bp = Blueprint("transaction", __name__)


# CREATE
@transaction_bp.route("/transaksi", methods=["POST"])
@token_required
def create():

    data = request.get_json()

    return jsonify(create_transaction(data))


# GET ALL
@transaction_bp.route("/transaksi", methods=["GET"])
@token_required
def get_all():

    return jsonify(get_transactions())


# GET BY ID
@transaction_bp.route("/transaksi/<int:id>", methods=["GET"])
@token_required
def get_one(id):

    return jsonify(get_transaction_by_id(id))


# UPDATE
@transaction_bp.route("/transaksi/<int:id>", methods=["PUT"])
@token_required
def update(id):

    data = request.get_json()

    return jsonify(update_transaction(id, data))


# DELETE
@transaction_bp.route("/transaksi/<int:id>", methods=["DELETE"])
@token_required
def delete(id):

    return jsonify(delete_transaction(id))