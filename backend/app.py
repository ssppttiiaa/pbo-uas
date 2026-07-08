from flask import Flask
from config.db import supabase
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.category_routes import category_bp
from routes.transaction_routes import transaction_bp
from routes.saving_routes import saving_bp
from routes.dashboard_routes import dashboard_bp
from routes.report_routes import report_bp


app = Flask(__name__)

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(category_bp)
app.register_blueprint(transaction_bp)
app.register_blueprint(saving_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(report_bp)


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