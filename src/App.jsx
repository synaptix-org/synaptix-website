import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Analyze from './pages/Analyze'
import Results from './pages/Results'
import Report from './pages/Report'

function App() {
  const location = useLocation()
  const hideNav = false // navbar visible everywhere

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/results" element={<Results />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </div>
  )
}

export default App
