from flask import Flask, request, jsonify, session
import sqlite3
import random
from datetime import datetime

app = Flask(__name__)
app.secret_key ='highly_secure_uncrackable_key_no_one_can_guess'


#return messages
NOTES = [
    "Accepted! Hope your future self giggles!",
    "That was questionable... Approved.",
    "Emotionally encrypted. Success.",
    "The cat ate ur message sorry :( ...kidding! Accepted!",
    "Your thoughts will now start fermenting. Success"
]


#connect to sql
def get_db():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn


#signup
@app.route("/signup", methods = ["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and Password required"}), 400

    conn = get_db()
    cur = conn.cursor()

    try:
        cur.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        return jsonify({"message": "Signup successful!"})
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists"}), 409
    finally:
        conn.close()


#logging in
@app.route("/login", methods = ["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = cur.fetchone()

    if user:
        session["user_id"] = user["username"]
        return jsonify({"message": "Login Successful!"})
    else:
        return jsonify({"error": "Invalid login"}), 401
    

#logout
@app.route("/logout", methods = ["POST"])
def logout():
    session.pop("user_id", None)
    return jsonify({"message": "Logged out"})



#creating capsules
@app.route("/create_capsule", methods = ["POST"])
def create_capsule():
    if "user_id" not in session:
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
    cur.execute("""INSERT INTO messages (message, unlock_date_time, mood, creation_date, user_id) VALUES(?, ?, ?, ?, ?)""", (message, unlock_date_time, mood, creation_date, user_id))
    conn.commit()
    conn.close()

    return jsonify({
        "status": "message_saved",
        "note": random.choice(NOTES),
        "creation": creation_date
    })

#opening msgs
@app.route("/view_capsule", methods =["POST"])
def view_capsule():
    if "user_id" not in session:
        return jsonify({"error": "Login Required"}), 401
    
    user_id = session["user_id"]
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM messages WHERE user_id = ?", (user_id,))
    capsules = cur.fetchall()
    conn.close()

    cur_time = datetime.now()
    result = []

    for i in capsules:
        unlock_time = datetime.fromisoformat(i["unlock_date_time"])
        is_unlocked = unlock_time <= cur_time

        time_left = str(unlock_time - cur_time) if not is_unlocked else "Unlocked"

        result.append({
            "id": i["id"],
            "message": i["message"] if is_unlocked else None,
            "unlock_date": i["unlock_date"],
            "created_at": i["creation_date"],
            "unlock_status": is_unlocked,
            "time_left": time_left
        })
    return jsonify(result)

#delete capsule
@app.route("/delete_capsule", methods = ["POST"])
def delete_capsule():
    if "user_id" not in session:
        return jsonify({"error": "Login Required"}), 401
    
    data = request.json
    capsule_id = data.get("capsule_id")
    if not capsule_id:
        return jsonify({"error": "Select capsule to delete"}), 400
    
    user_id = session["user_id"]
    conn = get_db()
    cur = conn.cursor()

    cur.execute("DELETE FROM messages WHERE id = ? AND user_id = ?", (capsule_id, user_id))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Capsule deleted successfully"})