import os
import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")


def generate_token(payload):

    payload["exp"] = datetime.utcnow() + timedelta(hours=24)

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )

    return token