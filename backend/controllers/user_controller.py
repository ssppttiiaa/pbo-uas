from flask import request
from config.db import supabase
from models.user_model import User


def get_profile():

    try:

        current_user = request.user

        result = (
            supabase.table("users")
            .select("id,nama,email")
            .eq("id", current_user["id"])
            .single()
            .execute()
        )

        if not result.data:
            return {
                "success": False,
                "message": "User tidak ditemukan"
            }

        db_user = result.data

        user = User(
            user_id=db_user["id"],
            nama=db_user["nama"],
            email=db_user["email"]
        )

        return {
            "success": True,
            "data": user.profile()
        }

    except Exception as e:

        print(e)

        return {
            "success": False,
            "message": "Gagal mengambil profil"
        }


def update_profile(data):

    try:

        current_user = request.user

        user = User(
            nama=data.get("nama"),
            email=data.get("email")
        )

        if not user.validate_name():
            return {
                "success": False,
                "message": "Nama minimal 3 karakter"
            }

        if not user.validate_email():
            return {
                "success": False,
                "message": "Email tidak valid"
            }

        cek = (
            supabase.table("users")
            .select("id")
            .eq("email", user.email)
            .execute()
        )

        if cek.data:

            for item in cek.data:

                if item["id"] != current_user["id"]:
                    return {
                        "success": False,
                        "message": "Email sudah digunakan"
                    }

        supabase.table("users").update({

            "nama": user.nama,
            "email": user.email

        }).eq("id", current_user["id"]).execute()

        return {

            "success": True,
            "message": "Profil berhasil diperbarui"

        }

    except Exception as e:

        print(e)

        return {

            "success": False,
            "message": "Gagal memperbarui profil"

        }


def delete_profile():

    try:

        current_user = request.user

        supabase.table("users")\
            .delete()\
            .eq("id", current_user["id"])\
            .execute()

        return {

            "success": True,
            "message": "Akun berhasil dihapus"

        }

    except Exception as e:

        print(e)

        return {

            "success": False,
            "message": "Gagal menghapus akun"

        }