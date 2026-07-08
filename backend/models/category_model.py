class Category:

    def __init__(self, category_id=None, nama_kategori="", tipe="", icon=""):
        self.id = category_id
        self.nama_kategori = nama_kategori
        self.tipe = tipe
        self.icon = icon

    def validate_name(self):
        return len(self.nama_kategori.strip()) >= 3

    def validate_type(self):
        return self.tipe in ["pemasukan", "pengeluaran"]

    def to_dict(self):
        return {
            "nama_kategori": self.nama_kategori,
            "tipe": self.tipe,
            "icon": self.icon
        }

    def response(self):
        return {
            "id": self.id,
            "nama_kategori": self.nama_kategori,
            "tipe": self.tipe,
            "icon": self.icon
        }