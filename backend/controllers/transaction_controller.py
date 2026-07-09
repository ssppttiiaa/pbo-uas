from flask import request
from config.db import supabase
from models.transaction_model import Transaction


def create_transaction(data):

    try:

        user = request.user

        if not data:
            return {
                "success": False,
                "message": "Data tidak boleh kosong"
            }

        required = [
            "kategori_id",
            "jumlah",
            "tanggal"
        ]

        for field in required:
            if not data.get(field):
                return {
                    "success": False,
                    "message": f"{field} wajib diisi"
                }

        transaksi = Transaction(
            user_id=user["id"],
            kategori_id=data["kategori_id"],
            jumlah=data["jumlah"],
            tanggal=data["tanggal"],
            catatan=data.get("catatan", "")
        )

        if not transaksi.validate_amount():
            return {
                "success": False,
                "message": "Jumlah harus lebih dari 0"
            }

        result = (
            supabase.table("transaksi")
            .insert(transaksi.to_dict())
            .execute()
        )

        return {
            "success": True,
            "message": "Transaksi berhasil ditambahkan",
            "data": result.data
        }
    except Exception as e:
        print("=== ERROR TRANSAKSI ===")
        print(type(e))
        print(e)

    return {
        "success": False,
        "message": str(e)
    }
    
def get_transactions():

    user = request.user

    result = (
        supabase.table("transaksi")
        .select("*")
        .eq("user_id", user["id"])
        .order("tanggal", desc=True)
        .execute()
    )

    return {
        "success": True,
        "data": result.data
    }

def get_transaction_by_id(transaction_id):

    user = request.user

    result = (
        supabase.table("transaksi")
        .select("*")
        .eq("id", transaction_id)
        .eq("user_id", user["id"])
        .execute()
    )

    if not result.data:
        return {
            "success": False,
            "message": "Transaksi tidak ditemukan"
        }

    return {
        "success": True,
        "data": result.data[0]
    }

def update_transaction(transaction_id, data):

    user = request.user

    transaksi = Transaction(
        user_id=user["id"],
        kategori_id=data["kategori_id"],
        jumlah=data["jumlah"],
        tanggal=data["tanggal"],
        catatan=data.get("catatan", "")
    )

    result = (
        supabase.table("transaksi")
        .update(transaksi.to_dict())
        .eq("id", transaction_id)
        .eq("user_id", user["id"])
        .execute()
    )

    return {
        "success": True,
        "message": "Transaksi berhasil diperbarui",
        "data": result.data
    }

def delete_transaction(transaction_id):

    user = request.user

    (
        supabase.table("transaksi")
        .delete()
        .eq("id", transaction_id)
        .eq("user_id", user["id"])
        .execute()
    )

    return {
        "success": True,
        "message": "Transaksi berhasil dihapus"
    }

