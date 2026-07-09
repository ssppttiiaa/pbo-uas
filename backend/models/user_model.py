import bcrypt

class User:

    def __init__(self, nama, email, password=None, user_id=None):
        # Protected
        self._id = user_id
        self._nama = nama
        self._email = email

        # Private
        self.__password = password

    # PROPERTY (Getter)
    @property
    def id(self):
        return self._id

    @property
    def nama(self):
        return self._nama

    @property
    def email(self):
        return self._email

    # Setter Password

    def set_password(self, password):
        self.__password = password

    # VALIDATION

    def validate_name(self):
        if not self._nama:
            return False
        return len(self._nama.strip()) >= 3

    def validate_email(self):
        if not self._email:
            return False
        return "@" in self._email and "." in self._email

    def validate_password(self):
        if not self.__password:
            return False
        return len(self.__password) >= 6

    # PASSWORD
    def check_password(self, plain_password):
        if not self.__password:
            return False

        return bcrypt.checkpw(
            plain_password.encode(),
            self.__password.encode()
        )
    
    # OUTPUT
    def to_dict(self):
        return {
            "nama": self._nama,
            "email": self._email,
            "password": self.__password
        }

    def profile(self):
        return {
            "id": self._id,
            "nama": self._nama,
            "email": self._email
        }

    def token_payload(self):
        return {
            "id": self._id,
            "nama": self._nama,
            "email": self._email
        }