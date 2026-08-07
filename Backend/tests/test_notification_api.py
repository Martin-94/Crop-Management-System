import unittest
from app import app


class NotificationAPITests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_notification_endpoint_returns_notifications(self):
        response = self.client.get("/api/notifications")

        self.assertEqual(response.status_code, 200)

        data = response.get_json()
        self.assertIsInstance(data, list)
        for notification in data:
            self.assertIn("id", notification)
            self.assertIn("message", notification)
            self.assertIn("timestamp", notification)


if __name__ == "__main__":
    unittest.main()
