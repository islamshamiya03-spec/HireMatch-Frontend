// src/pages/job-seeker/MatchedJobs.jsx
import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";

const bottomNavItems = [
  { label: "Home", icon: "🏠", path: "/job-seeker" },
  { label: "Search", icon: "🔍", path: "/job-seeker/jobs" },
  { label: "Matched", icon: "⭐", path: "/job-seeker/matched-jobs" },
  { label: "Applications", icon: "📄", path: "/job-seeker/applications" },
  { label: "Profile", icon: "👤", path: "/job-seeker/profile" },
];

// Mock user profile factors
const userProfile = {
  skills: ["HTML", "CSS", "React", "DSA"],
  desiredRole: "Frontend Developer",
  experience: "Fresher",
  preferredLocations: ["Remote", "Kolkata"],
  employmentType: "Full-time",
  salaryPreferenceMin: 500000,
  salaryPreferenceMax: 1200000,
  languages: ["English", "Bengali", "Hindi"],
};

// Mock matched jobs data
const mockMatchedJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechSoft Ltd.",
    location: "Remote",
    jobType: "Full-time",
    salary: "₹8,00,000 - ₹10,00,000",
    salaryMin: 800000,
    salaryMax: 1000000,
    matchScore: 92,
    skills: ["React", "JavaScript", "CSS"],
    matchedSkills: ["React", "CSS"],
    postedDate: "2 days ago",
    reasons: [
      "Strong React skill match",
      "Desired role matches",
      "Preferred location matches",
      "Experience aligns",
      "Salary range is suitable",
    ],
    description:
      "Build scalable front-end applications using React, collaborate with designers and backend team.",
  },
  {
    id: 2,
    title: "Junior Frontend Developer",
    company: "AlphaApps",
    location: "Kolkata",
    jobType: "Full-time",
    salary: "₹6,00,000 - ₹8,00,000",
    salaryMin: 600000,
    salaryMax: 800000,
    matchScore: 87,
    skills: ["HTML", "CSS", "React"],
    matchedSkills: ["HTML", "React"],
    postedDate: "5 days ago",
    reasons: [
      "Strong HTML and React match",
      "Desired role matches",
      "Preferred location matches",
      "Entry-level experience",
      "Salary compatible",
    ],
    description:
      "Work on UI components and collaborate with senior developers to build engaging apps.",
  },
  {
    id: 3,
    title: "React Developer",
    company: "NextGen Web",
    location: "Bangalore",
    jobType: "Full-time",
    salary: "₹7,50,000 - ₹9,00,000",
    salaryMin: 750000,
    salaryMax: 900000,
    matchScore: 81,
    skills: ["React", "CSS", "JavaScript"],
    matchedSkills: ["React"],
    postedDate: "1 week ago",
    reasons: [
      "React skill nearly matches fully",
      "Desired role fits",
      "Slight location mismatch",
      "Experience fits fresher level",
      "Salary near preference",
    ],
    description:
      "Develop modern web applications with React following the best practices.",
  },
];

// Sort options
const sortOptions = [
  { label: "Best Match", value: "best" },
  { label: "Recent", value: "recent" },
  { label: "Salary", value: "salary" },
];

// Filter match score options
const matchScoreFilters = [
  { label: "90% and above", min: 90 },
  { label: "80% to 89%", min: 80, max: 89 },
  { label: "Below 80%", max: 79 },
];

// Job types for filter
const jobTypes = ["Full-time", "Part-time", "Internship", "Remote"];

export default function MatchedJobs() {
  const navigate = useNavigate();
  const location = useLocation();

  // Controls state
  const [sort, setSort] = useState("best");
  const [filterMatchScore, setFilterMatchScore] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterJobType, setFilterJobType] = useState("");
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [viewJob, setViewJob] = useState(null);

  // Toggle save job
  function toggleSaveJob(id) {
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  }

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let jobs = [...mockMatchedJobs];

    // Filter match score
    if (filterMatchScore) {
      jobs = jobs.filter((job) => {
        if (filterMatchScore === "90") return job.matchScore >= 90;
        if (filterMatchScore === "80") return job.matchScore >= 80 && job.matchScore <= 89;
        if (filterMatchScore === "below80") return job.matchScore <= 79;
        return true;
      });
    }

    // Filter location
    if (filterLocation.trim()) {
      const locLower = filterLocation.toLowerCase();
      jobs = jobs.filter((job) => job.location.toLowerCase().includes(locLower));
    }

    // Filter job type
    if (filterJobType) {
      jobs = jobs.filter((job) => job.jobType === filterJobType);
    }

    // Sort
    jobs.sort((a, b) => {
      if (sort === "best") return b.matchScore - a.matchScore;
      if (sort === "recent") {
        // Simple date parse from postedDate string ("2 days ago"), mocked as fixed order:
        // We'll keep original order because placeholder data is already pseudo-sorted
        return 0;
      }
      if (sort === "salary")
        return (b.salaryMax || 0) - (a.salaryMax || 0);
      return 0;
    });

    return jobs;
  }, [filterMatchScore, filterLocation, filterJobType, sort]);

  return (
    <div className="min-h-screen pb-28 bg-blue-50 flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-md px-4 py-3 flex items-center justify-between rounded-b-xl">
        <button
          onClick={() => navigate("/job-seeker")}
          aria-label="Back to Dashboard"
          className="text-blue-700 font-semibold text-lg p-1"
          type="button"
        >
          ← Home
        </button>
        <h1 className="font-extrabold text-xl select-none">
          <span className="text-blue-600">Hire</span>
          <span className="text-slate-900">Match</span>
        </h1>
        <button
          onClick={() => navigate("/job-seeker/profile")}
          aria-label="Go to Profile"
          className="text-blue-700 font-semibold text-lg p-1"
          type="button"
        >
          Profile
        </button>
      </header>

      {/* HERO */}
      <section className="p-5 text-center bg-white shadow-md rounded-lg mx-4 my-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Jobs Matched For You</h2>
        <p className="text-blue-700 mb-4">
          Based on your profile, skills, experience and preferences.
        </p>
        <div className="bg-blue-100 p-4 rounded-lg max-w-xs mx-auto">
          <p className="text-lg font-semibold text-blue-900">
            {mockMatchedJobs.length} Jobs Match Your Profile
          </p>
          <p className="text-blue-700">
            Your current profile helps us find relevant opportunities.
          </p>
          <p className="mt-2 font-semibold text-blue-600">Strong Match</p>
        </div>
      </section>

      {/* MATCH FACTORS */}
      <section className="bg-white mx-4 p-4 rounded-lg shadow-md mb-4 max-w-[450px] mx-auto text-blue-900">
        <h3 className="font-semibold mb-2">Matched using:</h3>
        <ul className="list-none space-y-1">
          {[
            "Skills",
            "Desired Role",
            "Experience",
            "Location",
            "Employment Type",
            "Salary Preference",
            "Languages",
          ].map((factor) => (
            <li key={factor} className="flex items-center space-x-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>{factor}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FILTER / SORT CONTROLS */}
      <section className="bg-white mx-4 p-4 rounded-lg shadow-md max-w-[450px] mx-auto mb-6">
        <h3 className="text-lg font-semibold mb-3 text-blue-900">Filter & Sort</h3>
        <div className="space-y-4">
          {/* Sort */}
          <label className="block">
            <span className="text-sm font-medium text-blue-800">Sort by</span>
            <select
              value={sortOptions.find((o) => o.value === sort)?.value || "best"}
              onChange={(e) => setSort(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              aria-label="Sort matched jobs"
            >
              <option value="best">Best Match</option>
              <option value="recent">Recent</option>
              <option value="salary">Salary</option>
            </select>
          </label>

          {/* Match Score Filter */}
          <label className="block">
            <span className="text-sm font-medium text-blue-800">Match Score</span>
            <select
              value={filterMatchScore}
              onChange={(e) => setFilterMatchScore(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              aria-label="Filter match score"
            >
              <option value="">All</option>
              <option value="90">90% and above</option>
              <option value="80">80% to 89%</option>
              <option value="below80">Below 80%</option>
            </select>
          </label>

          {/* Location Filter */}
          <label className="block">
            <span className="text-sm font-medium text-blue-800">Location</span>
            <input
              type="text"
              placeholder="Filter by location"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              aria-label="Filter by location"
            />
          </label>

          {/* Job Type Filter */}
          <label className="block">
            <span className="text-sm font-medium text-blue-800">Job Type</span>
            <select
              value={filterJobType}
              onChange={(e) => setFilterJobType(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              aria-label="Filter by job type"
            >
              <option value="">All</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* MATCHED JOB CARDS */}
      <section className="mx-4 max-w-[450px] mx-auto">
        {filteredJobs.length === 0 ? (
          <NoMatches />
        ) : (
          filteredJobs.map((job) => (
            <MatchedJobCard
              key={job.id}
              job={job}
              saved={savedJobIds.includes(job.id)}
              toggleSave={toggleSaveJob}
              onView={() => setViewJob(job)}
            />
          ))
        )}
      </section>

      {/* VIEW JOB DETAILS MODAL */}
      {viewJob && <JobDetailModal job={viewJob} onClose={() => setViewJob(null)} />}

      {/* BOTTOM NAVIGATION */}
      <nav
        aria-label="Primary Navigation"
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow flex justify-around items-center h-16 z-50"
      >
        {bottomNavItems.map(({ label, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={label}
              onClick={() => {
                navigate(path);
                setViewJob(null);
              }}
              className={`flex flex-col items-center justify-center focus:outline-none ${
                isActive ? "text-blue-700 font-semibold" : "text-gray-500"
              }`}
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
              type="button"
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs mt-1">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function MatchedJobCard({ job, saved, toggleSave, onView }) {
  return (
    <article className="bg-white rounded-xl shadow-md p-4 mb-5">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-bold text-blue-900">{job.title}</h3>
          <p className="text-blue-700">{job.company}</p>
          <p className="text-blue-600 italic">{job.location}</p>
        </div>
        <button
          onClick={() => toggleSave(job.id)}
          aria-label={saved ? "Unsave job" : "Save job"}
          className={`text-xl cursor-pointer select-none ${
            saved ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
          }`}
          type="button"
        >
          ★
        </button>
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-blue-700 mb-2">
        <span>{job.jobType}</span>
        <span>Salary: {job.salary}</span>
      </div>

      <MatchScore value={job.matchScore} />

      <div className="mb-2 text-blue-700 text-sm">
        <strong>Matched skills:</strong>{" "}
        {job.matchedSkills.length > 0
          ? job.matchedSkills.join(", ")
          : "None"}
      </div>

      <div className="mb-2 text-xs text-blue-600">Posted: {job.postedDate}</div>

      <WhyMatches reasons={job.reasons} />

      <button
        onClick={onView}
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
        type="button"
      >
        View Job
      </button>
    </article>
  );
}

function MatchScore({ value }) {
  const score = Math.min(Math.max(value, 0), 100);
  const stroke = 5;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center space-x-2 mb-2">
      <svg
        className="w-10 h-10"
        viewBox="0 0 48 48"
        aria-label={`${score}% match score`}
        role="img"
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="#dbeafe"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="#2563eb"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
      </svg>
      <span className="font-semibold text-blue-700">{score}% Match</span>
    </div>
  );
}

function WhyMatches({ reasons }) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className="mb-2 text-sm text-blue-700">
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="text-blue-700 underline font-semibold mb-1 focus:outline-none"
        type="button"
      >
        {expanded ? "Hide Why This Matches" : "Why This Matches"}
      </button>
      {expanded && (
        <ul className="list-disc pl-5 space-y-1">
          {reasons.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function JobDetailModal({ job, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-md max-h-full overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close job details"
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold focus:outline-none"
          type="button"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2 text-blue-900">{job.title}</h2>
        <p className="text-blue-700 mb-1">{job.company}</p>
        <p className="text-blue-600 italic mb-2">{job.location}</p>
        <p className="text-sm text-blue-800 mb-1"><strong>Job Type:</strong> {job.jobType}</p>
        <p className="text-sm text-blue-800 mb-4"><strong>Salary:</strong> {job.salary}</p>
        <MatchScore value={job.matchScore} />
        <WhyMatches reasons={job.reasons} />
        <div className="mb-4 whitespace-pre-wrap text-blue-700">{job.description}</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.matchedSkills.map(skill => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1"
            >
              {skill}
            </span>
          ))}
        </div>
        <button
          onClick={() => alert("Application flow will be connected later.")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md w-full"
          type="button"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
