class Transaction:

    def __init__(
        self,
        transaction_id=None,
        user_id=None,
        kategori_id=None,
        jumlah=0,
        tanggal="",
        catatan=""
    ):
        self.id = transaction_id
        self.user_id = user_id
        self.kategori_id = kategori_id
        self.jumlah = jumlah
        self.tanggal = tanggal
        self.catatan = catatan

    def validate_amount(self):
        return self.jumlah > 0

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "kategori_id": self.kategori_id,
            "jumlah": self.jumlah,
            "tanggal": self.tanggal,
            "catatan": self.catatan
        }

    def response(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "kategori_id": self.kategori_id,
            "jumlah": self.jumlah,
            "tanggal": self.tanggal,
            "catatan": self.catatan
        }