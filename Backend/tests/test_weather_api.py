import unittest
from app import app

class WeatherAPITests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_weather_endpoint_returns_weather_data(self):
        response = self.client.get("/api/weather?city=London")

        self.assertEqual(response.status_code, 200)

        data = response.get_json()
        self.assertIn("city", data)
        self.assertIn("temperature", data)
        self.assertIn("condition", data)
        self.assertIn("forecast", data)
        self.assertIsInstance(data["forecast"], list)

if __name__ == "__main__":
    unittest.main()
    