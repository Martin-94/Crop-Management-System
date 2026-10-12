import sqlite3
 
from database import DB_PATH
 
 
def migrate_users_table():
    connection = sqlite3.connect(DB_PATH)
 
    try:
        existing_columns = {
            row[1]
            for row in connection.execute(
                "PRAGMA table_info(users)"
            ).fetchall()
        }
 
        required_columns = {
            "name": "TEXT NOT NULL DEFAULT ''",
            "surname": "TEXT NOT NULL DEFAULT ''",
            "farmType": "TEXT NOT NULL DEFAULT ''",
            "phoneNumber": "TEXT NOT NULL DEFAULT ''",
            "address": "TEXT NOT NULL DEFAULT ''",
        }
 
        for column_name, column_definition in required_columns.items():
            if column_name not in existing_columns:
                connection.execute(
                    f"""
                    ALTER TABLE users
                    ADD COLUMN {column_name} {column_definition}
                    """
                )
 
                print(f"Added column: {column_name}")
            else:
                print(f"Column already exists: {column_name}")
 
        connection.commit()
 
        updated_columns = connection.execute(
            "PRAGMA table_info(users)"
        ).fetchall()
 
        print("\nUsers table columns:")
 
        for column in updated_columns:
            print(f"- {column[1]}")
 
        print("\nDatabase migration completed successfully.")
 
    except sqlite3.Error as error:
        connection.rollback()
        print("Database migration failed:", error)
        raise
 
    finally:
        connection.close()
 
 
if __name__ == "__main__":
    migrate_users_table()
 