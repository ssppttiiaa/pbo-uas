from flask import request
from config.db import supabase
from models.user_model import User


def get_profile():
    try:
        user = request.user

        result = (
            supabase.table("users")
            .select("id, nama, email")
            .eq("id", user["id"])
            .single()
            .execute()
        )

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
        print("Get Profile Error:", e)

        return {
            "success": False,
            "message": "Gagal mengambil data profil"
        }


def update_profile(data):
    try:
        user = request.user

        # Validasi data kosong
        if not data:
            return {
                "success": False,
                "message": "Data tidak boleh kosong"
            }

        # Validasi nama
        if not data.get("nama"):
            return {
                "success": False,
                "message": "Nama wajib diisi"
            }

        if len(data["nama"].strip()) < 3:
            return {
                "success": False,
                "message": "Nama minimal 3 karakter"
            }

        # Validasi email
        if not data.get("email"):
            return {
                "success": False,
                "message": "Email wajib diisi"
            }

        if "@" not in data["email"] or "." not in data["email"]:
            return {
                "success": False,
                "message": "Format email tidak valid"
            }

        # Cek apakah email dipakai user lain
        cek = (
            supabase.table("users")
            .select("id")
            .eq("email", data["email"])
            .execute()
        )

        if cek.data:
            for item in cek.data:
                if item["id"] != user["id"]:
                    return {
                        "success": False,
                        "message": "Email sudah digunakan"
                    }

        # Update data
        supabase.table("users").update({
            "nama": data["nama"],
            "email": data["email"]
        }).eq("id", user["id"]).execute()

        return {
            "success": True,
            "message": "Profil berhasil diperbarui"
        }

    except Exception as e:
        print("Update Profile Error:", e)

        return {
            "success": False,
            "message": "Gagal memperbarui profil"
        }


def delete_profile():
    try:
        user = request.user

        supabase.table("users") \
            .delete() \
            .eq("id", user["id"]) \
            .execute()

        return {
            "success": True,
            "message": "Akun berhasil dihapus"
        }

    except Exception as e:
        print("Delete Profile Error:", e)

        return {
            "success": False,
            "message": "Gagal menghapus akun"
        }