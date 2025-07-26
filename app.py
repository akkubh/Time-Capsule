from flask import Flask, request, jsonify
import sqlite3
import random
from datetime import datetime

app = Flask(__name__)

#return messages
NOTES = [
    "Accepted! Hope your future self giggles!",
    "That was questionable... Approved.",
    "Emotionally encrypted. Success.",
    "The cat ate ur message sorry:(...kidding! Accepted!",
    "Your thoughts wil now start fermenting. Success"
]

#connect to sql
def get_db():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

#creating capsules
@app.route("/create_capsule", methods = ["POST"])
def create_capsule():
    if user_id not in session:
        return jsonify({"error": "Login Required"}), 401

    data = request.json
    message = data.get("message")
    unlock_date_time = data.get("unlock_date_time")
    mood = data.get("mood")

    if not (message and unlock_date_time and mood):
        return jsonify({"error": "Missing fields"}), 400

    creation_date = datetime.now().isoformat()
    user_id = session["user_id"]

    conn = get_db()
    cur = conn.cursor()
    cur.execute("""INSERT INTO messages (message, ulock_date_time, mood, creation_date, user_id) VALUES(?, ?, ?, ?)""", (message, unlock_date_time, mood, creation_date, user_id))
    conn.commit()
    conn.close()

    return jsonify({
        "status" = "message_saved",
        "note" = random.choice(NOTES),
        "creation" = creation_date
    })