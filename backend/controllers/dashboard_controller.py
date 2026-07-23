from flask import request
from config.db import supabase
from datetime import datetime


def dashboard():

    try:

        user = request.user
        now = datetime.now()
        bulan_ini = now.month
        tahun_ini = now.year

        transaksi = (
            supabase.table("transaksi")
            .select("*")
            .eq("user_id", user["id"])
            .execute()
        )

        kategori_res = (
            supabase.table("kategori")
            .select("*")
            .execute()
        )

        target = (
            supabase.table("target_tabungan")
            .select("*")
            .eq("user_id", user["id"])
            .execute()
        )

        # Map kategori_id -> kategori object
        kategori_map = {k["id"]: k for k in kategori_res.data}

        total_pemasukan = 0
        total_pengeluaran = 0

        # Data bulan ini
        bulan_pemasukan = 0
        bulan_pengeluaran = 0
        bulan_transaksi = []  # untuk grafik per hari

        for trx in transaksi.data:

            kat = kategori_map.get(trx.get("kategori_id"))
            tipe = kat.get("tipe") if kat else None

            # Total keseluruhan
            if tipe == "pemasukan":
                total_pemasukan += trx["jumlah"]
            elif tipe == "pengeluaran":
                total_pengeluaran += trx["jumlah"]

            # Filter bulan ini
            tanggal_str = trx.get("tanggal", "")
            if not tanggal_str:
                continue
            try:
                tgl = datetime.strptime(tanggal_str, "%Y-%m-%d")
            except ValueError:
                continue

            if tgl.month == bulan_ini and tgl.year == tahun_ini:
                trx_with_kat = dict(trx)
                trx_with_kat["kategori"] = kat
                bulan_transaksi.append(trx_with_kat)

                if tipe == "pemasukan":
                    bulan_pemasukan += trx["jumlah"]
                elif tipe == "pengeluaran":
                    bulan_pengeluaran += trx["jumlah"]

        saldo = total_pemasukan - total_pengeluaran

        return {
            "success": True,
            "data": {
                "total_pemasukan": total_pemasukan,
                "total_pengeluaran": total_pengeluaran,
                "saldo": saldo,
                "jumlah_transaksi": len(transaksi.data),
                "jumlah_target": len(target.data),
                # Data khusus bulan ini
                "bulan": bulan_ini,
                "tahun": tahun_ini,
                "bulan_pemasukan": bulan_pemasukan,
                "bulan_pengeluaran": bulan_pengeluaran,
                "bulan_saldo": bulan_pemasukan - bulan_pengeluaran,
                "bulan_transaksi": bulan_transaksi
            }
        }

    except Exception as e:
        print("Dashboard Error:", e)

        return {
            "success": False,
            "message": str(e)
        }
