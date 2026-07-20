from flask import request
from config.db import supabase
from models.category_model import Category


def create_category(data):
    try:
        if not data:
            return {"success": False, "message": "Data tidak boleh kosong"}

        required = ["nama_kategori", "tipe"]
        for field in required:
            if not data.get(field):
                return {"success": False, "message": f"{field} wajib diisi"}

        category = Category(
            nama_kategori=data["nama_kategori"],
            tipe=data["tipe"],
            icon=data.get("icon", "")
        )

        if not category.validate_name():
            return {"success": False, "message": "Nama kategori minimal 3 karakter"}

        if not category.validate_type():
            return {"success": False, "message": "Tipe harus pemasukan atau pengeluaran"}

        # Cek duplikat berdasarkan nama + tipe
        # Gunakan select("*") agar data lengkap bisa dikembalikan ke frontend
        cek = (
            supabase.table("kategori")
            .select("*")
            .eq("nama_kategori", category.nama_kategori)
            .eq("tipe", category.tipe)
            .execute()
        )

        if cek.data:
            # Kembalikan data yang sudah ada — JANGAN error
            # Penting untuk alur "Saldo Manual" otomatis
            return {
                "success": True,
                "message": "Kategori sudah ada",
                "data": cek.data
            }

        result = (
            supabase.table("kategori")
            .insert(category.to_dict())
            .execute()
        )

        return {
            "success": True,
            "message": "Kategori berhasil ditambahkan",
            "data": result.data
        }

    except Exception as e:
        print("=== ERROR KATEGORI ===")
        print(type(e))
        print(e)
        return {"success": False, "message": str(e)}


def get_categories():
    try:
        result = (
            supabase.table("kategori")
            .select("*")
            .order("id")
            .execute()
        )
        return {"success": True, "data": result.data}

    except Exception as e:
        print(e)
        return {"success": False, "data": [], "message": str(e)}


def get_category_by_id(category_id):
    try:
        result = (
            supabase.table("kategori")
            .select("*")
            .eq("id", category_id)
            .execute()
        )

        if not result.data:
            return {"success": False, "message": "Kategori tidak ditemukan"}

        return {"success": True, "data": result.data[0]}

    except Exception as e:
        print(e)
        return {"success": False, "message": str(e)}


def update_category(category_id, data):
    try:
        category = Category(
            nama_kategori=data["nama_kategori"],
            tipe=data["tipe"],
            icon=data.get("icon", "")
        )

        result = (
            supabase.table("kategori")
            .update(category.to_dict())
            .eq("id", category_id)
            .execute()
        )

        return {
            "success": True,
            "message": "Kategori berhasil diperbarui",
            "data": result.data
        }

    except Exception as e:
        print(e)
        return {"success": False, "message": str(e)}


def delete_category(category_id):
    try:
        (
            supabase.table("kategori")
            .delete()
            .eq("id", category_id)
            .execute()
        )
        return {"success": True, "message": "Kategori berhasil dihapus"}

    except Exception as e:
        print(e)
        return {"success": False, "message": str(e)}
