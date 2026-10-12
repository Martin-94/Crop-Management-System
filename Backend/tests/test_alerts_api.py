import unittest
from app import app

class AlertAPITests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_alert_endpoint_returns_alerts(self):
        response = self.client.get("/api/alerts")

        self.assertEqual(response.status_code, 200)

        data = response.get_json()
        self.assertIsInstance(data, list)
        for alert in data:
            self.assertIn("id", alert)
            self.assertIn("message", alert)
            self.assertIn("timestamp", alert)

if __name__ == "__main__":
    unittest.main()