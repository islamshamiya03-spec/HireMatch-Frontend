import { Navigate, Route, Routes } from 'react-router'
import JobSeekerDashboard from './pages/JobSeekerDashboard'
import JobSeekerProfile from './pages/JobSeekerProfile'
import LandingPage from './pages/LandingPage'
import Matches from './pages/Matches'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Job Seeker routes */}
      <Route
        path="/job-seeker"
        element={<JobSeekerDashboard />}
      />

      <Route
        path="/job-seeker/profile"
        element={<JobSeekerProfile />}
      />

      <Route
        path="/job-seeker/matches"
        element={<Matches />}
      />

      {/* Unknown route */}
      <Route
        path="*"
        element={<Navigate to="/job-seeker" replace />}
      />
    </Routes>
  )
}

export default App
