from flask import request
from config.db import supabase


def dashboard():

    try:

        user = request.user

        transaksi = (
            supabase.table("transaksi")
            .select("jumlah, kategori_id")
            .eq("user_id", user["id"])
            .execute()
        )

        kategori = (
            supabase.table("kategori")
            .select("id, tipe")
            .execute()
        )

        target = (
            supabase.table("target_tabungan")
            .select("*")
            .eq("user_id", user["id"])
            .execute()
        )

        kategori_map = {
            k["id"]: k["tipe"]
            for k in kategori.data
        }

        total_pemasukan = 0
        total_pengeluaran = 0

        for item in transaksi.data:

            tipe = kategori_map.get(item["kategori_id"])

            if tipe == "pemasukan":
                total_pemasukan += item["jumlah"]

            elif tipe == "pengeluaran":
                total_pengeluaran += item["jumlah"]

        saldo = total_pemasukan - total_pengeluaran

        return {
            "success": True,
            "data": {
                "total_pemasukan": total_pemasukan,
                "total_pengeluaran": total_pengeluaran,
                "saldo": saldo,
                "jumlah_transaksi": len(transaksi.data),
                "jumlah_target": len(target.data)
            }
        }

    except Exception as e:
        print(e)

        return {
            "success": False,
            "message": str(e)
        }