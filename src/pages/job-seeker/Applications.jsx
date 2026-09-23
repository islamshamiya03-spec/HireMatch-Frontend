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

const statusOptions = [
  "All",
  "Applied",
  "Shortlisted",
  "Interview",
  "Rejected",
];

const mockApplications = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Kolkata",
    jobType: "Full-time",
    appliedDate: "2 days ago",
    status: "Applied",
    salary: "₹5,00,000 - ₹7,00,000",
  },
  {
    id: 2,
    title: "React Developer",
    company: "NextGen Web",
    location: "Bangalore",
    jobType: "Full-time",
    appliedDate: "5 days ago",
    status: "Shortlisted",
    salary: "₹7,00,000 - ₹10,00,000",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Labs",
    location: "Remote",
    jobType: "Remote",
    appliedDate: "1 week ago",
    status: "Interview",
    salary: "₹4,00,000 - ₹6,00,000",
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "CloudStack",
    location: "Hyderabad",
    jobType: "Full-time",
    appliedDate: "2 weeks ago",
    status: "Rejected",
    salary: "₹6,50,000 - ₹9,00,000",
  },
];

function getStatusClasses(status) {
  switch (status) {
    case "Shortlisted":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Interview":
      return "bg-purple-50 text-purple-700 border-purple-200";

    case "Rejected":
      return "bg-red-50 text-red-700 border-red-200";

    case "Applied":
    default:
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
}

export default function Applications() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = useMemo(() => {
    if (selectedStatus === "All") {
      return mockApplications;
    }

    return mockApplications.filter(
      (application) => application.status === selectedStatus
    );
  }, [selectedStatus]);

  const totalApplications = mockApplications.length;
  const shortlistedCount = mockApplications.filter(
    (item) => item.status === "Shortlisted"
  ).length;
  const interviewCount = mockApplications.filter(
    (item) => item.status === "Interview"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/job-seeker")}
            className="text-xl font-bold text-blue-700"
            aria-label="Go back"
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
        {/* Page heading */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            My Applications
          </h2>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Track the jobs you have applied for and their current status.
          </p>
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryCard
            label="Total Applications"
            value={totalApplications}
            icon="📄"
          />

          <SummaryCard
            label="Shortlisted"
            value={shortlistedCount}
            icon="⭐"
          />

          <SummaryCard
            label="Interviews"
            value={interviewCount}
            icon="🎯"
          />
        </section>

        {/* Filter */}
        <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-slate-900">
                Application Status
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Filter your applications by status.
              </p>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Application list */}
        <section className="mt-5 space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl">📄</div>

              <h3 className="mt-3 text-xl font-bold text-slate-900">
                No applications found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                There are no applications with this status.
              </p>

              <button
                type="button"
                onClick={() => navigate("/job-seeker/jobs")}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                Find Jobs
              </button>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <article
                key={application.id}
                className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {application.title}
                    </h3>

                    <p className="mt-1 font-semibold text-blue-600">
                      {application.company}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
                  <span>📍 {application.location}</span>
                  <span>💼 {application.jobType}</span>
                  <span>💰 {application.salary}</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-500">
                    Applied {application.appliedDate}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedApplication(application)}
                    className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Find More Jobs */}
        <section className="mt-6 rounded-2xl bg-blue-600 p-5 text-white shadow-sm">
          <h3 className="text-xl font-bold">
            Looking for more opportunities?
          </h3>

          <p className="mt-1 text-sm text-blue-100">
            Search for more jobs and keep building your application list.
          </p>

          <button
            type="button"
            onClick={() => navigate("/job-seeker/jobs")}
            className="mt-4 rounded-xl bg-white px-5 py-3 font-bold text-blue-700"
          >
            Search Jobs
          </button>
        </section>
      </main>

      {/* Application details modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedApplication.title}
                </h2>

                <p className="mt-1 font-semibold text-blue-600">
                  {selectedApplication.company}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="text-2xl text-gray-500"
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedApplication.status}
              </p>

              <p>
                <span className="font-semibold">Location:</span>{" "}
                {selectedApplication.location}
              </p>

              <p>
                <span className="font-semibold">Job Type:</span>{" "}
                {selectedApplication.jobType}
              </p>

              <p>
                <span className="font-semibold">Salary:</span>{" "}
                {selectedApplication.salary}
              </p>

              <p>
                <span className="font-semibold">Applied:</span>{" "}
                {selectedApplication.appliedDate}
              </p>
            </div>

            {selectedApplication.status === "Interview" && (
              <div className="mt-6 rounded-xl bg-purple-50 p-4">
                <h3 className="font-bold text-purple-800">
                  Interview Status
                </h3>

                <p className="mt-1 text-sm text-purple-700">
                  Interview details will be connected with the backend
                  later.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setSelectedApplication(null)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
            >
              Close
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
              aria-current={isActive ? "page" : undefined}
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

function SummaryCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>

        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-2 text-sm font-medium text-gray-500">
        {label}
      </p>
    </div>
  );
}