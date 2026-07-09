from flask import request
from config.db import supabase
from models.saving_model import Saving


def create_saving(data):

    try:

        user = request.user

        if not data:
            return {
                "success": False,
                "message": "Data tidak boleh kosong"
            }

        required = [
            "nama_target",
            "nominal_target",
            "deadline"
        ]

        for field in required:
            if not data.get(field):
                return {
                    "success": False,
                    "message": f"{field} wajib diisi"
                }

        saving = Saving(
            user_id=user["id"],
            nama_target=data["nama_target"],
            nominal_target=data["nominal_target"],
            nominal_terkumpul=data.get("nominal_terkumpul", 0),
            deadline=data["deadline"]
        )

        if not saving.validate_name():
            return {
                "success": False,
                "message": "Nama target minimal 3 karakter"
            }

        if not saving.validate_target():
            return {
                "success": False,
                "message": "Nominal target harus lebih dari 0"
            }

        result = (
            supabase.table("target_tabungan")
            .insert(saving.to_dict())
            .execute()
        )

        return {
            "success": True,
            "message": "Target tabungan berhasil ditambahkan",
            "data": result.data
        }

    except Exception as e:
        print(e)

        return {
            "success": False,
            "message": str(e)
        }
    
def get_savings():

    user = request.user

    result = (
        supabase.table("target_tabungan")
        .select("*")
        .eq("user_id", user["id"])
        .order("id")
        .execute()
    )

    return {
        "success": True,
        "data": result.data
    }
def get_saving_by_id(saving_id):

    user = request.user

    result = (
        supabase.table("target_tabungan")
        .select("*")
        .eq("id", saving_id)
        .eq("user_id", user["id"])
        .execute()
    )

    if not result.data:
        return {
            "success": False,
            "message": "Target tidak ditemukan"
        }

    return {
        "success": True,
        "data": result.data[0]
    }
def update_saving(saving_id, data):

    user = request.user

    saving = Saving(
        user_id=user["id"],
        nama_target=data["nama_target"],
        nominal_target=data["nominal_target"],
        nominal_terkumpul=data["nominal_terkumpul"],
        deadline=data["deadline"]
    )

    result = (
        supabase.table("target_tabungan")
        .update(saving.to_dict())
        .eq("id", saving_id)
        .eq("user_id", user["id"])
        .execute()
    )

    return {
        "success": True,
        "message": "Target berhasil diperbarui",
        "data": result.data
    }

def delete_saving(saving_id):

    user = request.user

    (
        supabase.table("target_tabungan")
        .delete()
        .eq("id", saving_id)
        .eq("user_id", user["id"])
        .execute()
    )

    return {
        "success": True,
        "message": "Target berhasil dihapus"
    }