"""
Database utility functions for the Crop Management System API.
Provides functions to handle common database operations such as:
- Establishing a connection to the SQLite database.
- Executing queries and retrieving results."""

import hashlib
import os
import sqlite3
import uuid
from datetime import datetime

BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, "app_data.db")


def get_connection():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def verify_password(password: str, password_hash: str) -> bool:
    return hash_password(password) == password_hash


def query_one(query: str, params=()):
    with get_connection() as conn:
        cursor = conn.execute(query, params)
        return cursor.fetchone()


def query_all(query: str, params=()):
    with get_connection() as conn:
        cursor = conn.execute(query, params)
        return cursor.fetchall()


def execute(query: str, params=(), commit=True):
    with get_connection() as conn:
        cursor = conn.execute(query, params)
        if commit:
            conn.commit()
        return cursor


def get_user_by_username(username: str):
    return query_one("SELECT * FROM users WHERE username = ?", (username,))


def get_user_by_email(email: str):
    return query_one("SELECT * FROM users WHERE email = ?", (email,))


def get_user_by_id(user_id: int):
    return query_one("SELECT * FROM users WHERE id = ?", (user_id,))


def create_user(username: str, email: str, password: str):
    password_hash = hash_password(password)
    cursor = execute(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        (username, email, password_hash),
    )
    return cursor.lastrowid


def get_profile(user_id: int):
    return query_one("SELECT * FROM profiles WHERE user_id = ?", (user_id,))


def update_profile(user_id: int, bio: str | None, location: str | None):
    profile = get_profile(user_id)
    if profile:
        return execute(
            "UPDATE profiles SET bio = ?, location = ? WHERE user_id = ?",
            (bio or profile["bio"], location or profile["location"], user_id),
        )
    return execute(
        "INSERT INTO profiles (user_id, bio, location) VALUES (?, ?, ?)",
        (user_id, bio or "", location or ""),
    )


def get_settings(user_id: int):
    return query_one("SELECT * FROM settings WHERE user_id = ?", (user_id,))


def update_settings(user_id: int, notifications: int, timezone: str):
    settings = get_settings(user_id)
    if settings:
        return execute(
            "UPDATE settings SET notifications = ?, timezone = ? WHERE user_id = ?",
            (notifications, timezone, user_id),
        )
    return execute(
        "INSERT INTO settings (user_id, notifications, timezone) VALUES (?, ?, ?)",
        (user_id, notifications, timezone),
    )


def get_crops():
    return query_all("SELECT id, name, type, planting_date, status FROM crops ORDER BY id")


def get_crop(id: int):
    return query_one("SELECT id, name, type, planting_date, status FROM crops WHERE id = ?", (id,))


def get_livestock():
    return query_all("SELECT id, name, species, age, status FROM livestock ORDER BY id")


def get_livestock_item(id: int):
    return query_one("SELECT id, name, species, age, status FROM livestock WHERE id = ?", (id,))


def get_alerts():
    return query_all("SELECT id, message, timestamp FROM alerts ORDER BY id")


def get_notifications():
    return query_all("SELECT id, message, timestamp FROM notifications ORDER BY id")


def get_income():
    return query_all("SELECT id, source, amount, date FROM income ORDER BY date DESC")


def get_expenses():
    return query_all("SELECT id, category, amount, date FROM expenses ORDER BY date DESC")


def get_finance_summary():
    total_income = query_one("SELECT SUM(amount) AS total FROM income")
    total_expenses = query_one("SELECT SUM(amount) AS total FROM expenses")
    return {
        "monthly_income": total_income["total"] or 0,
        "monthly_expenses": total_expenses["total"] or 0,
        "balance": (total_income["total"] or 0) - (total_expenses["total"] or 0),
    }


def get_dashboard_stats():
    return {
        "active_crops": query_one("SELECT COUNT(*) AS count FROM crops")["count"],
        "livestock_count": query_one("SELECT COUNT(*) AS count FROM livestock")["count"],
        "recent_alerts": query_one("SELECT COUNT(*) AS count FROM alerts WHERE timestamp >= ?", ((datetime.utcnow().isoformat(),),))["count"],
        "income_this_month": query_one("SELECT SUM(amount) AS total FROM income")["total"] or 0,
        "expenses_this_month": query_one("SELECT SUM(amount) AS total FROM expenses")["total"] or 0,
    }


def init_db():
    if not os.path.exists(DB_PATH):
        open(DB_PATH, "a").close()

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL)"
        )
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL, bio TEXT, location TEXT, FOREIGN KEY(user_id) REFERENCES users(id))"
        )
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL, notifications INTEGER NOT NULL DEFAULT 1, timezone TEXT NOT NULL DEFAULT 'UTC', FOREIGN KEY(user_id) REFERENCES users(id))"
        )
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS crops (id INTEGER PRIMARY KEY, name TEXT NOT NULL, type TEXT, planting_date TEXT, status TEXT)"
        )
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS livestock (id INTEGER PRIMARY KEY, name TEXT NOT NULL, species TEXT, age INTEGER, status TEXT)"
        )
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS alerts (id INTEGER PRIMARY KEY, message TEXT NOT NULL, timestamp TEXT NOT NULL)"
        )
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY, message TEXT NOT NULL, timestamp TEXT NOT NULL)"
        )
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS income (id INTEGER PRIMARY KEY, source TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL)"
        )
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY, category TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL)"
        )

        if not cursor.execute("SELECT 1 FROM users LIMIT 1").fetchone():
            user_id = create_user("farmer", "farmer@example.com", "password123")
            update_profile(user_id, "Farm manager", "Nairobi")
            update_settings(user_id, 1, "Africa/Nairobi")

        if not cursor.execute("SELECT 1 FROM crops LIMIT 1").fetchone():
            cursor.executemany(
                "INSERT INTO crops (name, type, planting_date, status) VALUES (?, ?, ?, ?)",
                [
                    ("Maize", "Grains", "2026-01-20", "Growing"),
                    ("Tomatoes", "Vegetable", "2026-02-10", "Harvesting"),
                ],
            )

        if not cursor.execute("SELECT 1 FROM livestock LIMIT 1").fetchone():
            cursor.executemany(
                "INSERT INTO livestock (name, species, age, status) VALUES (?, ?, ?, ?)",
                [
                    ("Bella", "Cow", 3, "Healthy"),
                    ("Chia", "Chicken", 1, "Laying"),
                ],
            )

        if not cursor.execute("SELECT 1 FROM alerts LIMIT 1").fetchone():
            cursor.executemany(
                "INSERT INTO alerts (message, timestamp) VALUES (?, ?)",
                [
                    ("Soil moisture is low in the north field.", datetime.utcnow().isoformat()),
                    ("Pest activity detected near the greenhouse.", datetime.utcnow().isoformat()),
                ],
            )

        if not cursor.execute("SELECT 1 FROM notifications LIMIT 1").fetchone():
            cursor.executemany(
                "INSERT INTO notifications (message, timestamp) VALUES (?, ?)",
                [
                    ("Watering reminder scheduled for today.", datetime.utcnow().isoformat()),
                    ("Weather alert: strong winds expected this afternoon.", datetime.utcnow().isoformat()),
                ],
            )

        if not cursor.execute("SELECT 1 FROM income LIMIT 1").fetchone():
            cursor.executemany(
                "INSERT INTO income (source, amount, date) VALUES (?, ?, ?)",
                [
                    ("Market sale", 3200.0, "2026-08-01"),
                    ("Dairy delivery", 1500.0, "2026-08-03"),
                ],
            )

        if not cursor.execute("SELECT 1 FROM expenses LIMIT 1").fetchone():
            cursor.executemany(
                "INSERT INTO expenses (category, amount, date) VALUES (?, ?, ?)",
                [
                    ("Fertilizer", 520.0, "2026-08-02"),
                    ("Feed", 320.0, "2026-08-04"),
                ],
            )

        conn.commit()
