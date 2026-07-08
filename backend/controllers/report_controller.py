from flask import request
from config.db import supabase
from datetime import datetime


def monthly_report():

    try:

        user = request.user

        bulan = request.args.get("bulan")
        tahun = request.args.get("tahun")

        transaksi = (
            supabase.table("transaksi")
            .select("*, kategori(*)")
            .eq("user_id", user["id"])
            .execute()
        )

        total_pemasukan = 0
        total_pengeluaran = 0

        hasil = []

        for trx in transaksi.data:

            tanggal = datetime.strptime(
                trx["tanggal"],
                "%Y-%m-%d"
            )

            if (
                tanggal.month == int(bulan)
                and
                tanggal.year == int(tahun)
            ):

                hasil.append(trx)

                if trx["kategori"]["tipe"] == "pemasukan":
                    total_pemasukan += trx["jumlah"]

                else:
                    total_pengeluaran += trx["jumlah"]

        return {
            "success": True,
            "data": {
                "bulan": bulan,
                "tahun": tahun,
                "total_pemasukan": total_pemasukan,
                "total_pengeluaran": total_pengeluaran,
                "saldo": total_pemasukan-total_pengeluaran,
                "transaksi": hasil
            }
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }