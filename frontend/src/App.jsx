import { Routes, Route } from 'react-router-dom'
import MainScreen from './pages/MainScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
    </Routes>
  )
}

export default App