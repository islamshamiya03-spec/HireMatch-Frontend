import React from "react";
import { useNavigate, useLocation } from "react-router";

const bottomNavItems = [
  { label: "Home", icon: "🏠", path: "/job-seeker" },
  { label: "Search", icon: "🔍", path: "/job-seeker/jobs" },
  { label: "Matched", icon: "⭐", path: "/job-seeker/matched-jobs" },
  { label: "Applications", icon: "📄", path: "/job-seeker/applications" },
  { label: "Profile", icon: "👤", path: "/job-seeker/profile" },
];

const quickActions = [
  { label: "Complete Profile", icon: "📝", path: "/job-seeker/profile" },
  { label: "Resume", icon: "📄", path: "/job-seeker/resume" },
  { label: "Search Jobs", icon: "🔍", path: "/job-seeker/jobs" },
  { label: "Matched Jobs", icon: "⭐", path: "/job-seeker/matched-jobs" },
];

const stats = [
  { label: "Applications", value: 12 },
  { label: "Matched Jobs", value: 8 },
  { label: "Saved Jobs", value: 5 },
];

const recommendedJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechSoft Ltd.",
    location: "Remote",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "CloudWorks",
    location: "Bangalore, India",
    skills: ["Node.js", "Express", "Databases"],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Innovate Studios",
    location: "Kolkata, India",
    skills: ["Figma", "Adobe XD", "Prototyping"],
  },
];

export default function JobSeekerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // For profile completion percent; static for now
  const profileCompletion = 75;

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* MOBILE HEADER */}
      <header className="bg-white border-b border-gray-200 shadow px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div
          className="text-2xl font-bold text-blue-700 cursor-pointer"
          onClick={() => navigate("/job-seeker")}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/job-seeker")}
          aria-label="HireMatch Home"
        >
          HireMatch
        </div>
        <button
          onClick={() => navigate("/job-seeker/profile")}
          aria-label="Profile"
          className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-full text-white font-bold text-lg"
        >
          👤
        </button>
      </header>

      <main className="flex-grow px-4 pt-4 max-w-3xl mx-auto w-full">
        {/* SEARCH BAR */}
        <button
          onClick={() => navigate("/job-seeker/jobs")}
          className="w-full flex items-center bg-white rounded-lg shadow p-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Search jobs"
        >
          <span className="mr-2 text-lg">🔍</span>
          <span className="text-left text-gray-400">Search jobs, skills or companies</span>
        </button>

        {/* WELCOME SECTION */}
        <section className="mt-6 mb-4">
          <p className="text-lg font-semibold text-blue-800 mb-1">Good morning 👋</p>
          <h2 className="text-2xl font-bold text-blue-900 mb-1">Find your next opportunity</h2>
          <p className="text-sm text-blue-700 max-w-sm">
            Use your dashboard to manage your profile and explore jobs tailored for you.
          </p>
        </section>

        {/* QUICK ACTIONS - horizontally scroll */}
        <section className="mb-6 overflow-x-auto">
          <div className="flex space-x-4">
            {quickActions.map(({ label, icon, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex-shrink-0 flex flex-col items-center justify-center bg-white shadow rounded-lg px-5 py-4 w-32 text-blue-700 font-semibold hover:bg-blue-50 transition"
                aria-label={label}
              >
                <span className="text-2xl mb-1">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* PROFILE COMPLETION CARD */}
        <section className="mb-6 bg-white rounded-lg shadow p-4">
          <p className="text-blue-800 font-semibold mb-2">
            Your profile is {profileCompletion}% complete
          </p>
          <div className="w-full bg-blue-100 rounded-full h-3 mb-3 overflow-hidden">
            <div
              className="bg-blue-600 h-3"
              style={{ width: `${profileCompletion}%` }}
              aria-valuenow={profileCompletion}
              aria-valuemin="0"
              aria-valuemax="100"
              role="progressbar"
            />
          </div>
          <button
            onClick={() => navigate("/job-seeker/profile")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            aria-label="Complete Profile"
          >
            Complete Profile
          </button>
        </section>

        {/* STATS CARDS */}
        <section className="mb-6 grid grid-cols-3 gap-4 text-center">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="bg-white rounded-lg shadow p-3 flex flex-col items-center justify-center"
            >
              <span className="text-xl font-bold text-blue-800">{value}</span>
              <span className="text-sm text-blue-700">{label}</span>
            </div>
          ))}
        </section>

        {/* RECOMMENDED JOBS */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Recommended for you</h3>
          <div className="space-y-4">
            {recommendedJobs.map(({ id, title, company, location, skills }) => (
              <div
                key={id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
                role="article"
                aria-label={`Job: ${title} at ${company}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-blue-900">{title}</h4>
                    <p className="text-blue-700 text-sm">{company}</p>
                    <p className="text-blue-600 italic text-xs">{location}</p>
                  </div>
                  <button
                    aria-label="Save job"
                    title="Save job"
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                    onClick={() => alert(`Saved job: ${title}`)}
                  >
                    ★
                  </button>
                </div>
                <p className="text-blue-700 text-xs mb-3 truncate max-w-full">
                  Skills: {skills.join(", ")}
                </p>
                <button
                  onClick={() => alert(`View Job: ${title}`)}
                  className="self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md transition"
                  aria-label={`View Job details for ${title}`}
                >
                  View Job
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FIXED BOTTOM NAVIGATION */}
      <nav
        aria-label="Primary Navigation"
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow flex justify-around items-center h-16 z-40"
      >
        {bottomNavItems.map(({ label, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center focus:outline-none ${
                isActive ? "text-blue-700 font-semibold" : "text-gray-500"
              }`}
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
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
