import sqlite3

def get_db():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with open("schema.sql", "r") as f:
        sql = f.read()

    conn = get_db()
    cur = conn.cursor()
    cur.executescript(sql)
    conn.commit()
    conn.close()