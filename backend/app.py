from flask import Flask
from config.db import supabase
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp


app = Flask(__name__)

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)

@app.route("/")
def home():

    data = supabase.table("users") \
        .select("*") \
        .execute()

    return {
        "message": "Koneksi berhasil",
        "data": data.data
    }

if __name__ == "__main__":
    app.run(debug=True)