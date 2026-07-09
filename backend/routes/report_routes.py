from flask import Blueprint, jsonify
from controllers.report_controller import monthly_report
from middleware.auth_middleware import token_required

report_bp = Blueprint("report", __name__)

@report_bp.route("/laporan", methods=["GET"])
@token_required
def report():
    return jsonify(monthly_report())