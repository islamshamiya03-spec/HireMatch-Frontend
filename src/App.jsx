import React from "react";
import { Navigate, Route, Routes } from "react-router";

import LandingPage from "./pages/LandingPage";
import JobSeekerDashboard from "./pages/job-seeker/JobSeekerDashboard";
import JobSeekerProfile from "./pages/job-seeker/JobSeekerProfile";
import ResumeBuilder from "./pages/job-seeker/ResumeBuilder";
import JobSearch from "./pages/job-seeker/JobSearch";
import MatchedJobs from "./pages/job-seeker/MatchedJobs";
import Applications from "./pages/job-seeker/Applications";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/job-seeker"
        element={<JobSeekerDashboard />}
      />

      <Route
        path="/job-seeker/profile"
        element={<JobSeekerProfile />}
      />

      <Route
        path="/job-seeker/resume"
        element={<ResumeBuilder />}
      />

      <Route
        path="/job-seeker/jobs"
        element={<JobSearch />}
      />

      <Route
        path="/job-seeker/matched-jobs"
        element={<MatchedJobs />}
      />

      <Route
        path="/job-seeker/applications"
        element={<Applications />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}