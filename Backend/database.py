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


def create_user(
    *,
    name,
    surname,
    email,
    username,
    password,
    farmType,
    phoneNumber,
    address,
):
    password_hash = hash_password(password)

    cursor = execute(
        """
        INSERT INTO users (
            username,
            email,
            password_hash,
            name,
            surname,
            farmType,
            phoneNumber,
            address
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            username,
            email,
            password_hash,
            name,
            surname,
            farmType,
            phoneNumber,
            address,
        ),
    )

    return cursor.lastrowid

def get_profile(user_id: int):
    return query_one(
        """
        SELECT
            u.id,
            u.name,
            u.surname,
            u.phoneNumber,
            u.address,
            u.farmType,
            COALESCE(p.farmName, '') AS farmName,
            COALESCE(p.language, '') AS language,
            COALESCE(p.location, '') AS location
        FROM users AS u
        LEFT JOIN profiles AS p
            ON u.id = p.user_id
        WHERE u.id = ?
        """,
        (user_id,),
    )


def update_profile(
    user_id: int,
    name: str,
    surname: str,
    phone: str,
    address: str,
    crop_type: str,
    farm_name: str,
    language: str,
):
    execute(
        """
        UPDATE users
        SET
            name = ?,
            surname = ?,
            phoneNumber = ?,
            address = ?,
            farmType = ?
        WHERE id = ?
        """,
        (
            name,
            surname,
            phone,
            address,
            crop_type,
            user_id,
        ),
    )

    profile = query_one(
        "SELECT user_id FROM profiles WHERE user_id = ?",
        (user_id,),
    )

    if profile:
        execute(
            """
            UPDATE profiles
            SET
                farmName = ?,
                language = ?
            WHERE user_id = ?
            """,
            (
                farm_name,
                language,
                user_id,
            ),
        )
    else:
        execute(
            """
            INSERT INTO profiles (
                user_id,
                location,
                farmName,
                language
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                user_id,
                "",
                farm_name,
                language,
            ),
        )

def get_settings(user_id: int):
    return query_one("SELECT * FROM settings WHERE user_id = ?", (user_id,))


def update_settings(
    user_id: int,
    weather_alerts: bool,
    pest_alerts: bool,
    water_alerts: bool,
    offline_mode: bool,
    low_data_usage: bool,
):
    settings = get_settings(user_id)

    values = (
        int(weather_alerts),
        int(pest_alerts),
        int(water_alerts),
        int(offline_mode),
        int(low_data_usage),
        user_id,
    )

    if settings:
        return execute(
            """
            UPDATE settings
            SET weather_alerts = ?,
                pest_alerts = ?,
                water_alerts = ?,
                offline_mode = ?,
                low_data_usage = ?
            WHERE user_id = ?
            """,
            values,
        )

    return execute(
        """
        INSERT INTO settings (
            weather_alerts,
            pest_alerts,
            water_alerts,
            offline_mode,
            low_data_usage,
            user_id
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        values,
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

def update_user_password(email: str, password: str):
    password_hash = hash_password(password)

    return execute(
        "UPDATE users SET password_hash = ? WHERE email = ?",
        (password_hash, email),
    )

def init_db():
    if not os.path.exists(DB_PATH):
        open(DB_PATH, "a").close()

    with get_connection() as conn:
        cursor = conn.cursor()

        # USERS TABLE
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                name TEXT,
                surname TEXT,
                farmType TEXT,
                phoneNumber TEXT,
                address TEXT
            )
            """
        )

        # PROFILES TABLE
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS profiles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL UNIQUE,
                location TEXT,
                farmName TEXT,
                language TEXT,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
            """
        )

        

        # SETTINGS TABLE
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS settings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL UNIQUE,
                notifications INTEGER NOT NULL DEFAULT 1,
                timezone TEXT NOT NULL DEFAULT 'UTC',
                weather_alerts INTEGER NOT NULL DEFAULT 1,
                pest_alerts INTEGER NOT NULL DEFAULT 1,
                water_alerts INTEGER NOT NULL DEFAULT 1,
                offline_mode INTEGER NOT NULL DEFAULT 0,
                low_data_usage INTEGER NOT NULL DEFAULT 0,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
            """
        )

        # ADD NEW SETTINGS COLUMNS TO AN EXISTING DATABASE
        settings_columns = {
            row["name"]
            for row in cursor.execute(
                "PRAGMA table_info(settings)"
            ).fetchall()
        }

        missing_columns = {
            "weather_alerts": "INTEGER NOT NULL DEFAULT 1",
            "pest_alerts": "INTEGER NOT NULL DEFAULT 1",
            "water_alerts": "INTEGER NOT NULL DEFAULT 1",
            "offline_mode": "INTEGER NOT NULL DEFAULT 0",
            "low_data_usage": "INTEGER NOT NULL DEFAULT 0",
        }

        for column_name, column_definition in missing_columns.items():
            if column_name not in settings_columns:
                cursor.execute(
                    f"""
                    ALTER TABLE settings
                    ADD COLUMN {column_name} {column_definition}
                    """
                )

        # CROPS TABLE
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS crops (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                type TEXT,
                planting_date TEXT,
                status TEXT
            )
            """
        )

        # LIVESTOCK TABLE
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS livestock (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                species TEXT,
                age INTEGER,
                status TEXT
            )
            """
        )

        # ALERTS TABLE
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                message TEXT NOT NULL,
                timestamp TEXT NOT NULL
            )
            """
        )

        # NOTIFICATIONS TABLE
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS notifications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                message TEXT NOT NULL,
                timestamp TEXT NOT NULL
            )
            """
        )

        # INCOME TABLE
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS income (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                source TEXT NOT NULL,
                amount REAL NOT NULL,
                date TEXT NOT NULL
            )
            """
        )

        # EXPENSES TABLE
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT NOT NULL,
                amount REAL NOT NULL,
                date TEXT NOT NULL
            )
            """
        )

        # CREATE DEMO USER IF USERS TABLE IS EMPTY
        existing_user = cursor.execute(
            "SELECT id FROM users LIMIT 1"
        ).fetchone()

        if not existing_user:
            password_hash = hash_password("password123")

            cursor.execute(
                """
                INSERT INTO users (
                    username,
                    email,
                    password_hash,
                    name,
                    surname,
                    farmType,
                    phoneNumber,
                    address
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    "farmer",
                    "farmer@example.com",
                    password_hash,
                    "Demo",
                    "Farmer",
                    "Mixed Farming",
                    "0000000000",
                    "Demo Address",
                ),
            )

            user_id = cursor.lastrowid

            cursor.execute(
            """
            INSERT INTO profiles (
                user_id,
                location,
                farmName,
                language
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                user_id,
                "Nairobi",
                "Demo Farm",
                "English",
            ),
        )

            cursor.execute(
                """
                INSERT INTO settings (
                    user_id,
                    notifications,
                    timezone,
                    weather_alerts,
                    pest_alerts,
                    water_alerts,
                    offline_mode,
                    low_data_usage
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    user_id,
                    1,
                    "Africa/Nairobi",
                    1,
                    1,
                    1,
                    0,
                    0,
                ),
            )

        # ENSURE EXISTING USERS HAVE SETTINGS
        users_without_settings = cursor.execute(
            """
            SELECT users.id
            FROM users
            LEFT JOIN settings
                ON users.id = settings.user_id
            WHERE settings.user_id IS NULL
            """
        ).fetchall()

        for user in users_without_settings:
            cursor.execute(
                """
                INSERT INTO settings (
                    user_id,
                    notifications,
                    timezone,
                    weather_alerts,
                    pest_alerts,
                    water_alerts,
                    offline_mode,
                    low_data_usage
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    user["id"],
                    1,
                    "Africa/Johannesburg",
                    1,
                    1,
                    1,
                    0,
                    0,
                ),
            )

        # SAMPLE CROPS
        existing_crop = cursor.execute(
            "SELECT id FROM crops LIMIT 1"
        ).fetchone()

        if not existing_crop:
            cursor.executemany(
                """
                INSERT INTO crops (
                    name,
                    type,
                    planting_date,
                    status
                )
                VALUES (?, ?, ?, ?)
                """,
                [
                    (
                        "Maize",
                        "Grains",
                        "2026-01-20",
                        "Growing",
                    ),
                    (
                        "Tomatoes",
                        "Vegetable",
                        "2026-02-10",
                        "Harvesting",
                    ),
                ],
            )

        # SAMPLE LIVESTOCK
        existing_livestock = cursor.execute(
            "SELECT id FROM livestock LIMIT 1"
        ).fetchone()

        if not existing_livestock:
            cursor.executemany(
                """
                INSERT INTO livestock (
                    name,
                    species,
                    age,
                    status
                )
                VALUES (?, ?, ?, ?)
                """,
                [
                    (
                        "Bella",
                        "Cow",
                        3,
                        "Healthy",
                    ),
                    (
                        "Chia",
                        "Chicken",
                        1,
                        "Laying",
                    ),
                ],
            )

        # SAMPLE ALERTS
        existing_alert = cursor.execute(
            "SELECT id FROM alerts LIMIT 1"
        ).fetchone()

        if not existing_alert:
            cursor.executemany(
                """
                INSERT INTO alerts (
                    message,
                    timestamp
                )
                VALUES (?, ?)
                """,
                [
                    (
                        "Soil moisture is low in the north field.",
                        datetime.utcnow().isoformat(),
                    ),
                    (
                        "Pest activity detected near the greenhouse.",
                        datetime.utcnow().isoformat(),
                    ),
                ],
            )

        # SAMPLE NOTIFICATIONS
        existing_notification = cursor.execute(
            "SELECT id FROM notifications LIMIT 1"
        ).fetchone()

        if not existing_notification:
            cursor.executemany(
                """
                INSERT INTO notifications (
                    message,
                    timestamp
                )
                VALUES (?, ?)
                """,
                [
                    (
                        "Watering reminder scheduled for today.",
                        datetime.utcnow().isoformat(),
                    ),
                    (
                        "Weather alert: strong winds expected this afternoon.",
                        datetime.utcnow().isoformat(),
                    ),
                ],
            )

        # SAMPLE INCOME
        existing_income = cursor.execute(
            "SELECT id FROM income LIMIT 1"
        ).fetchone()

        if not existing_income:
            cursor.executemany(
                """
                INSERT INTO income (
                    source,
                    amount,
                    date
                )
                VALUES (?, ?, ?)
                """,
                [
                    (
                        "Market sale",
                        3200.0,
                        "2026-08-01",
                    ),
                    (
                        "Dairy delivery",
                        1500.0,
                        "2026-08-03",
                    ),
                ],
            )

        # SAMPLE EXPENSES
        existing_expense = cursor.execute(
            "SELECT id FROM expenses LIMIT 1"
        ).fetchone()

        if not existing_expense:
            cursor.executemany(
                """
                INSERT INTO expenses (
                    category,
                    amount,
                    date
                )
                VALUES (?, ?, ?)
                """,
                [
                    (
                        "Fertilizer",
                        520.0,
                        "2026-08-02",
                    ),
                    (
                        "Feed",
                        320.0,
                        "2026-08-04",
                    ),
                ],
            )

        conn.commit()
