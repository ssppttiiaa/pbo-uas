from config.db import supabase
import bcrypt
from utils.jwt_helper import generate_token
from models.user_model import User


def register_user(data):
    try:
        if not data:
            return {
                "success": False,
                "message": "Data tidak boleh kosong"
            }

        required = ["nama", "email", "password"]

        for field in required:
            if not data.get(field):
                return {
                    "success": False,
                    "message": f"{field.capitalize()} wajib diisi"
                }

        user = User(
            nama=data["nama"],
            email=data["email"].strip().lower(),
            password=data["password"]
        )

        if not user.validate_name():
            return {
                "success": False,
                "message": "Nama minimal 3 karakter"
            }

        if not user.validate_email():
            return {
                "success": False,
                "message": "Format email tidak valid"
            }

        if not user.validate_password():
            return {
                "success": False,
                "message": "Password minimal 6 karakter"
            }

        cek = (
            supabase.table("users")
            .select("id")
            .eq("email", user.email)
            .execute()
        )

        if cek.data:
            return {
                "success": False,
                "message": "Email sudah terdaftar"
            }
        # Hash password

        hashed_password = bcrypt.hashpw(
            data["password"].encode(),
            bcrypt.gensalt()
        ).decode()

        user.set_password(hashed_password)


        # Simpan ke database
        supabase.table("users").insert(
            user.to_dict()
        ).execute()

        return {
            "success": True,
            "message": "Registrasi berhasil",
            "user": user.profile()
        }

    except Exception as e:
        print("Register Error:", e)

        return {
            "success": False,
            "message": "Terjadi kesalahan pada server"
        }

def login_user(data):
    try:
        # Cek data kosong
        if not data:
            return {
                "success": False,
                "message": "Data tidak boleh kosong"
            }

        # Validasi field wajib
        if not data.get("email") or not data.get("password"):
            return {
                "success": False,
                "message": "Email dan password wajib diisi"
            }

        login_data = User(
            nama="",
            email=data["email"],
            password=data["password"]
        )

        if not login_data.validate_email():
            return {
                "success": False,
                "message": "Format email tidak valid"
    }
        # Cari user berdasarkan email
        result = (
            supabase.table("users")
            .select("*")
            .eq("email", data["email"])
            .execute()
        )

        if not result.data:
            return {
                "success": False,
                "message": "Email tidak ditemukan"
            }

        db_user = result.data[0]

        user = User(
            user_id=db_user["id"],
            nama=db_user["nama"],
            email=db_user["email"],
            password=db_user["password"]
        )

        # Cek password
        if not user.check_password(data["password"]):
            return {
                "success": False,
                "message": "Password salah"
            }

        # Generate JWT
        token = generate_token(user.token_payload())

        return {
            "success": True,
            "message": "Login berhasil",
            "token": token,
            "user": user.profile()
        }

    except Exception as e:
        print("Login Error :", e)

        return {
            "success": False,
            "message": "Terjadi kesalahan pada server"
        }