import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const bottomNavItems = [
  { label: "Home", icon: "🏠", path: "/job-seeker" },
  { label: "Search", icon: "🔍", path: "/job-seeker/jobs" },
  { label: "Matched", icon: "⭐", path: "/job-seeker/matched-jobs" },
  {
    label: "Applications",
    icon: "📄",
    path: "/job-seeker/applications",
  },
  { label: "Profile", icon: "👤", path: "/job-seeker/profile" },
];

const jobTypes = ["All", "Full-time", "Part-time", "Internship", "Remote"];

const experienceOptions = [
  "All",
  "Fresher",
  "1–3 years",
  "3–5 years",
  "5+ years",
];

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Kolkata",
    jobType: "Full-time",
    experience: "Fresher",
    salaryMin: 500000,
    salaryMax: 700000,
    salary: "₹5,00,000 - ₹7,00,000",
    skills: ["HTML", "CSS", "React"],
    postedDate: "2 days ago",
    description:
      "Build responsive web interfaces and work with the frontend development team.",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Labs",
    location: "Remote",
    jobType: "Remote",
    experience: "Fresher",
    salaryMin: 400000,
    salaryMax: 600000,
    salary: "₹4,00,000 - ₹6,00,000",
    skills: ["Figma", "UI Design", "UX"],
    postedDate: "1 day ago",
    description:
      "Create user-friendly digital experiences and collaborate with product teams.",
  },
  {
    id: 3,
    title: "React Developer",
    company: "NextGen Web",
    location: "Bangalore",
    jobType: "Full-time",
    experience: "1–3 years",
    salaryMin: 700000,
    salaryMax: 1000000,
    salary: "₹7,00,000 - ₹10,00,000",
    skills: ["React", "JavaScript", "Tailwind"],
    postedDate: "3 days ago",
    description:
      "Develop modern React applications and reusable frontend components.",
  },
  {
    id: 4,
    title: "Data Scientist Intern",
    company: "DataWorks",
    location: "Remote",
    jobType: "Internship",
    experience: "Fresher",
    salaryMin: 250000,
    salaryMax: 350000,
    salary: "₹2,50,000 - ₹3,50,000",
    skills: ["Python", "SQL", "Machine Learning"],
    postedDate: "5 days ago",
    description:
      "Support data analysis and machine learning projects with the data team.",
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "CloudStack",
    location: "Hyderabad",
    jobType: "Full-time",
    experience: "1–3 years",
    salaryMin: 650000,
    salaryMax: 900000,
    salary: "₹6,50,000 - ₹9,00,000",
    skills: ["Node.js", "Express", "MongoDB"],
    postedDate: "4 days ago",
    description:
      "Build APIs and backend services for scalable web applications.",
  },
];

export default function JobSearch() {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [jobType, setJobType] = useState("All");
  const [experience, setExperience] = useState("All");
  const [salaryMin, setSalaryMin] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const [savedJobIds, setSavedJobIds] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = useMemo(() => {
    if (!searchTriggered) {
      return mockJobs;
    }

    const normalizedQuery = query.trim().toLowerCase();
    const normalizedLocation = locationQuery.trim().toLowerCase();
    const minimumSalary = Number(salaryMin) || 0;

    return mockJobs.filter((job) => {
      const searchableText = [
        job.title,
        job.company,
        job.location,
        ...job.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || searchableText.includes(normalizedQuery);

      const matchesLocation =
        !normalizedLocation ||
        job.location.toLowerCase().includes(normalizedLocation);

      const matchesJobType =
        jobType === "All" || job.jobType === jobType;

      const matchesExperience =
        experience === "All" || job.experience === experience;

      const matchesSalary =
        !minimumSalary || job.salaryMax >= minimumSalary;

      return (
        matchesQuery &&
        matchesLocation &&
        matchesJobType &&
        matchesExperience &&
        matchesSalary
      );
    });
  }, [
    query,
    locationQuery,
    jobType,
    experience,
    salaryMin,
    searchTriggered,
  ]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchTriggered(true);
  }

  function clearFilters() {
    setQuery("");
    setLocationQuery("");
    setJobType("All");
    setExperience("All");
    setSalaryMin("");
    setSearchTriggered(false);
  }

  function toggleSave(jobId) {
    setSavedJobIds((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/job-seeker")}
            className="text-xl font-bold text-blue-700"
          >
            ←
          </button>

          <h1 className="text-2xl font-extrabold">
            <span className="text-blue-600">Hire</span>
            <span className="text-slate-900">Match</span>
          </h1>

          <div className="w-8" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl p-4 sm:p-6">
        {/* Page Heading */}
        <section className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Find Your Next Job
          </h2>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Search for jobs based on your own preferences.
          </p>
        </section>

        {/* Search Panel */}
        <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
          <form onSubmit={handleSearch}>
            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job title, company or skill"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Location"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                {jobTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                {experienceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>

              <input
                type="number"
                min="0"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                placeholder="Minimum salary (₹)"
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                Search Jobs
              </button>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 text-sm font-semibold text-blue-600"
            >
              Clear all filters
            </button>
          </form>
        </section>

        {/* Results Header */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {searchTriggered ? "Search Results" : "Available Jobs"}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {filteredJobs.length} job
              {filteredJobs.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {/* Job Cards */}
        <section className="mt-4 space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl">🔍</div>

              <h3 className="mt-3 text-xl font-bold text-slate-900">
                No jobs found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);

              return (
                <article
                  key={job.id}
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 font-medium text-blue-600">
                        {job.company}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSave(job.id)}
                      className={`rounded-full border px-3 py-2 text-sm font-semibold ${
                        isSaved
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-600"
                      }`}
                    >
                      {isSaved ? "★ Saved" : "☆ Save"}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.jobType}</span>
                    <span>🎓 {job.experience}</span>
                  </div>

                  <p className="mt-3 font-semibold text-slate-800">
                    {job.salary}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-xs text-gray-500">
                      Posted {job.postedDate}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700"
                    >
                      View Job
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </main>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedJob.title}
                </h2>

                <p className="mt-1 font-semibold text-blue-600">
                  {selectedJob.company}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="text-2xl text-gray-500"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm text-gray-700">
              <p>📍 {selectedJob.location}</p>
              <p>💼 {selectedJob.jobType}</p>
              <p>🎓 {selectedJob.experience}</p>
              <p>💰 {selectedJob.salary}</p>
              <p>🕒 Posted {selectedJob.postedDate}</p>
            </div>

            <div className="mt-5">
              <h3 className="font-bold text-slate-900">
                Required Skills
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                {selectedJob.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-bold text-slate-900">
                Job Description
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {selectedJob.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedJob(null);
                alert("Application flow will be connected with the backend.");
              }}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 bg-white shadow-lg"
        aria-label="Primary navigation"
      >
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center px-2 py-1 ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="mt-0.5 text-[11px] font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}