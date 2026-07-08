class Saving:

    def __init__(
        self,
        saving_id=None,
        user_id=None,
        nama_target="",
        nominal_target=0,
        nominal_terkumpul=0,
        deadline=""
    ):
        self.id = saving_id
        self.user_id = user_id
        self.nama_target = nama_target
        self.nominal_target = nominal_target
        self.nominal_terkumpul = nominal_terkumpul
        self.deadline = deadline

    def validate_name(self):
        return len(self.nama_target.strip()) >= 3

    def validate_target(self):
        return self.nominal_target > 0

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "nama_target": self.nama_target,
            "nominal_target": self.nominal_target,
            "nominal_terkumpul": self.nominal_terkumpul,
            "deadline": self.deadline
        }

    def response(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "nama_target": self.nama_target,
            "nominal_target": self.nominal_target,
            "nominal_terkumpul": self.nominal_terkumpul,
            "deadline": self.deadline
        }