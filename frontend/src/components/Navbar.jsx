import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex flex-wrap justify-between items-center gap-4">
      <Link to="/dashboard" className="text-2xl font-bold">
        Cropelle
      </Link>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>

        <Link to="/weather" className="hover:underline">
          Weather
        </Link>

        <Link to="/alerts" className="hover:underline">
          Alerts
        </Link>

        <Link to="/notifications" className="hover:underline">
          Notifications
        </Link>

        <Link to="/profile" className="hover:underline">
          Profile
        </Link>

        <Link to="/settings" className="hover:underline">
          Settings
        </Link>
      </div>
    </nav>
  )
}

export default Navbar