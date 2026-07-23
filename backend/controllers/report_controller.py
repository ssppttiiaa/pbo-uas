from flask import request
from config.db import supabase
from datetime import datetime


def monthly_report():

    try:

        user = request.user

        bulan = request.args.get("bulan")
        tahun = request.args.get("tahun")

        # Fallback ke bulan & tahun sekarang jika tidak dikirim
        if not bulan or not tahun:
            now = datetime.now()
            bulan = bulan or str(now.month)
            tahun = tahun or str(now.year)

        try:
            bulan_int = int(bulan)
            tahun_int = int(tahun)
        except (ValueError, TypeError):
            return {
                "success": False,
                "message": "Parameter bulan dan tahun harus berupa angka"
            }

        if not (1 <= bulan_int <= 12):
            return {
                "success": False,
                "message": "Bulan harus antara 1-12"
            }

        # Ambil semua transaksi milik user
        transaksi_res = (
            supabase.table("transaksi")
            .select("*")
            .eq("user_id", user["id"])
            .execute()
        )

        # Ambil semua kategori (manual join — tidak perlu FK di Supabase)
        kategori_res = (
            supabase.table("kategori")
            .select("*")
            .execute()
        )

        # Buat map kategori_id -> kategori object
        kategori_map = {
            k["id"]: k
            for k in kategori_res.data
        }

        total_pemasukan = 0
        total_pengeluaran = 0
        hasil = []

        for trx in transaksi_res.data:

            # Skip transaksi tanpa tanggal
            if not trx.get("tanggal"):
                continue

            try:
                tanggal = datetime.strptime(trx["tanggal"], "%Y-%m-%d")
            except ValueError:
                continue

            # Filter berdasarkan bulan & tahun
            if tanggal.month != bulan_int or tanggal.year != tahun_int:
                continue

            # Tempel data kategori ke transaksi (manual join)
            kat = kategori_map.get(trx.get("kategori_id"))
            trx_with_kat = dict(trx)
            trx_with_kat["kategori"] = kat  # bisa None kalau kategori sudah dihapus

            hasil.append(trx_with_kat)

            if kat and kat.get("tipe") == "pemasukan":
                total_pemasukan += trx["jumlah"]
            elif kat and kat.get("tipe") == "pengeluaran":
                total_pengeluaran += trx["jumlah"]

        # Urutkan berdasarkan tanggal terbaru
        hasil.sort(key=lambda x: x.get("tanggal", ""), reverse=True)

        return {
            "success": True,
            "data": {
                "bulan": bulan,
                "tahun": tahun,
                "total_pemasukan": total_pemasukan,
                "total_pengeluaran": total_pengeluaran,
                "saldo": total_pemasukan - total_pengeluaran,
                "transaksi": hasil
            }
        }

    except Exception as e:

        print("Laporan Error:", e)

        return {
            "success": False,
            "message": str(e)
        }
