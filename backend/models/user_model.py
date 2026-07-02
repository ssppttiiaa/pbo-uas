import bcrypt
class User:

    def __init__(self, nama, email, password=None, user_id=None):
        self.id = user_id
        self.nama = nama
        self.email = email
        self.password = password

    # Validasi email
    def validate_email(self):
        return "@" in self.email and "." in self.email

    # Validasi password
    def validate_password(self):
        return self.password is not None and len(self.password) >= 6

    # Validasi nama
    def validate_name(self):
        return len(self.nama.strip()) >= 3

    # Data untuk disimpan ke database
    def to_dict(self):
        return {
            "nama": self.nama,
            "email": self.email,
            "password": self.password
        }

    # Data profile
    def profile(self):
        return {
            "id": self.id,
            "nama": self.nama,
            "email": self.email
        }

    # Data untuk JWT
    def token_payload(self):
        return {
            "id": self.id,
            "nama": self.nama,
            "email": self.email
        }
    
    #check password
    def check_password(self, plain_password):
        return bcrypt.checkpw(
            plain_password.encode(),
            self.password.encode()
        )