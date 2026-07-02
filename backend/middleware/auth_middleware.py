from functools import wraps
from flask import request, jsonify
from dotenv import load_dotenv
import jwt
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = request.headers.get("Authorization")

        if not token:
            return jsonify({
                "success": False,
                "message": "Token tidak ditemukan"
            }), 401

        # Hilangkan "Bearer " jika ada
        if token.startswith("Bearer "):
            token = token.split(" ")[1]

        try:
            data = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=["HS256"]
            )

            request.user = data

        except jwt.ExpiredSignatureError:
            return jsonify({
                "success": False,
                "message": "Token sudah kadaluarsa"
            }), 401

        except jwt.InvalidTokenError:
            return jsonify({
                "success": False,
                "message": "Token tidak valid"
            }), 401

        return f(*args, **kwargs)

    return decorated