from config.db import supabase
from models.category_model import Category


def create_category(data):
    try:

        if not data:
            return {
                "success": False,
                "message": "Data tidak boleh kosong"
            }

        required = ["nama_kategori", "tipe"]

        for field in required:
            if not data.get(field):
                return {
                    "success": False,
                    "message": f"{field} wajib diisi"
                }

        category = Category(
            nama_kategori=data["nama_kategori"],
            tipe=data["tipe"],
            icon=data.get("icon", "")
        )

        if not category.validate_name():
            return {
                "success": False,
                "message": "Nama kategori minimal 3 karakter"
            }

        if not category.validate_type():
            return {
                "success": False,
                "message": "Tipe harus pemasukan atau pengeluaran"
            }

        cek = (
            supabase.table("kategori")
            .select("*")
            .eq("nama_kategori", category.nama_kategori)
            .execute()
        )

        if cek.data:
            return {
                "success": False,
                "message": "Kategori sudah ada"
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
        print(e)

        return {
            "success": False,
            "message": "Terjadi kesalahan server"
        }
    
def get_categories():

    result = (
        supabase.table("kategori")
        .select("*")
        .order("id")
        .execute()
    )

    return {
        "success": True,
        "data": result.data
    }

def get_category_by_id(category_id):

    result = (
        supabase.table("kategori")
        .select("*")
        .eq("id", category_id)
        .execute()
    )

    if not result.data:
        return {
            "success": False,
            "message": "Kategori tidak ditemukan"
        }

    return {
        "success": True,
        "data": result.data[0]
    }

def update_category(category_id, data):

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

def delete_category(category_id):

    (
        supabase.table("kategori")
        .delete()
        .eq("id", category_id)
        .execute()
    )

    return {
        "success": True,
        "message": "Kategori berhasil dihapus"
    }

