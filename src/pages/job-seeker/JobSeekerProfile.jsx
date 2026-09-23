import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";

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

function CircularProgress({ percentage }) {
  const radius = 54;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      role="img"
      aria-label={`Profile completion ${percentage}%`}
      className="mx-auto"
    >
      <circle
        stroke="#dbeafe"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      <circle
        stroke="#2563eb"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{
          transition: "stroke-dashoffset 0.3s ease",
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
      />

      <text
        x="50%"
        y="50%"
        dy="0.3em"
        textAnchor="middle"
        className="fill-blue-700 text-xl font-bold"
      >
        {percentage}%
      </text>
    </svg>
  );
}

export default function JobSeekerProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [editMode, setEditMode] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Personal information
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [locationValue, setLocationValue] = useState("");

  // Skills
  const [skills, setSkills] = useState([
    "HTML",
    "CSS",
    "React",
    "DSA",
  ]);
  const [newSkill, setNewSkill] = useState("");

  // Languages
  const [languages, setLanguages] = useState([
    "English",
    "Bengali",
    "Hindi",
  ]);
  const [newLanguage, setNewLanguage] = useState("");

  // Education
  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      year: "",
    },
  ]);

  // Experience
  const [experience, setExperience] = useState([
    {
      company: "",
      role: "",
      duration: "",
    },
  ]);

  // About me
  const [aboutMe, setAboutMe] = useState("");

  function toggleEdit() {
    setEditMode((prev) => !prev);
  }

  function addSkill(event) {
    event.preventDefault();

    const value = newSkill.trim();

    if (!value) return;

    if (!skills.includes(value)) {
      setSkills((prev) => [...prev, value]);
    }

    setNewSkill("");
  }

  function removeSkill(skillToRemove) {
    setSkills((prev) =>
      prev.filter((skill) => skill !== skillToRemove)
    );
  }

  function addLanguage(event) {
    event.preventDefault();

    const value = newLanguage.trim();

    if (!value) return;

    if (!languages.includes(value)) {
      setLanguages((prev) => [...prev, value]);
    }

    setNewLanguage("");
  }

  function removeLanguage(languageToRemove) {
    setLanguages((prev) =>
      prev.filter((language) => language !== languageToRemove)
    );
  }

  function addEducation() {
    setEducation((prev) => [
      ...prev,
      {
        degree: "",
        institution: "",
        year: "",
      },
    ]);
  }

  function removeEducation(index) {
    setEducation((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

  function updateEducation(index, field, value) {
    setEducation((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  function addExperience() {
    setExperience((prev) => [
      ...prev,
      {
        company: "",
        role: "",
        duration: "",
      },
    ]);
  }

  function removeExperience(index) {
    setExperience((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

  function updateExperience(index, field, value) {
    setExperience((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  function saveProfile() {
    setSaveMessage("Profile saved successfully.");
    setEditMode(false);

    window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <button
          type="button"
          onClick={() => navigate("/job-seeker")}
          className="rounded-lg px-2 py-1 text-xl font-bold text-blue-700"
          aria-label="Go back"
        >
          ←
        </button>

        <h1 className="text-2xl font-extrabold">
          <span className="text-blue-600">Hire</span>
          <span className="text-slate-900">Match</span>
        </h1>

        <div className="w-8" />
      </header>

      <main className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6">
        {/* Profile Hero */}
        <section className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-blue-100 text-4xl font-extrabold text-blue-600">
            JS

            <button
              type="button"
              onClick={() => {
                setSaveMessage("Profile picture option is not connected yet.");
                window.setTimeout(() => setSaveMessage(""), 2500);
              }}
              className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md"
              aria-label="Edit profile picture"
            >
              ✎
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Job Seeker Profile
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Complete your profile to improve your job matches.
          </p>

          <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <CircularProgress percentage={75} />

            <div className="w-full max-w-xs">
              <div className="h-3 overflow-hidden rounded-full bg-blue-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: "75%" }}
                />
              </div>

              <p className="mt-2 text-sm font-semibold text-blue-700">
                Profile 75% complete
              </p>
            </div>
          </div>
        </section>

        {/* Personal Information */}
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-slate-900">
              Personal Information
            </h3>

            <button
              type="button"
              onClick={toggleEdit}
              className="font-semibold text-blue-600"
            >
              {editMode ? "Done" : "Edit"}
            </button>
          </div>

          <div className="space-y-4">
            <InputField
              label="Full Name"
              value={fullName}
              onChange={setFullName}
              placeholder="Enter your full name"
              disabled={!editMode}
            />

            <InputField
              label="Professional Headline"
              value={headline}
              onChange={setHeadline}
              placeholder="Example: Frontend Developer"
              disabled={!editMode}
            />

            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              disabled={!editMode}
            />

            <InputField
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={setPhone}
              placeholder="Enter your phone number"
              disabled={!editMode}
            />

            <InputField
              label="Location"
              value={locationValue}
              onChange={setLocationValue}
              placeholder="City, State, Country"
              disabled={!editMode}
            />
          </div>
        </section>

        {/* Skills */}
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Skills</h3>

            <button
              type="button"
              onClick={toggleEdit}
              className="font-semibold text-blue-600"
            >
              {editMode ? "Done" : "Edit"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700"
              >
                <span>{skill}</span>

                {editMode && (
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="font-bold text-blue-700"
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {editMode && (
            <form
              onSubmit={addSkill}
              className="mt-4 flex gap-2"
            >
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600"
              />

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
              >
                Add
              </button>
            </form>
          )}
        </section>

        {/* Languages */}
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              Languages
            </h3>

            <button
              type="button"
              onClick={toggleEdit}
              className="font-semibold text-blue-600"
            >
              {editMode ? "Done" : "Edit"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <div
                key={language}
                className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700"
              >
                <span>{language}</span>

                {editMode && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(language)}
                    className="font-bold text-blue-700"
                    aria-label={`Remove ${language}`}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {editMode && (
            <form
              onSubmit={addLanguage}
              className="mt-4 flex gap-2"
            >
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add a language"
                className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600"
              />

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
              >
                Add
              </button>
            </form>
          )}
        </section>

        {/* Education */}
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              Education
            </h3>

            <button
              type="button"
              onClick={toggleEdit}
              className="font-semibold text-blue-600"
            >
              {editMode ? "Done" : "Edit"}
            </button>
          </div>

          <div className="space-y-5">
            {education.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="space-y-4">
                  <InputField
                    label="Degree / Qualification"
                    value={item.degree}
                    onChange={(value) =>
                      updateEducation(index, "degree", value)
                    }
                    placeholder="Enter degree or qualification"
                    disabled={!editMode}
                  />

                  <InputField
                    label="Institution"
                    value={item.institution}
                    onChange={(value) =>
                      updateEducation(index, "institution", value)
                    }
                    placeholder="Enter institution"
                    disabled={!editMode}
                  />

                  <InputField
                    label="Year"
                    type="number"
                    value={item.year}
                    onChange={(value) =>
                      updateEducation(index, "year", value)
                    }
                    placeholder="Graduation year"
                    disabled={!editMode}
                  />
                </div>

                {editMode && education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="mt-4 font-semibold text-red-600"
                  >
                    Remove Education
                  </button>
                )}
              </div>
            ))}
          </div>

          {editMode && (
            <button
              type="button"
              onClick={addEducation}
              className="mt-4 w-full rounded-lg bg-blue-50 py-3 font-semibold text-blue-700"
            >
              + Add Education
            </button>
          )}
        </section>

        {/* Experience */}
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              Experience
            </h3>

            <button
              type="button"
              onClick={toggleEdit}
              className="font-semibold text-blue-600"
            >
              {editMode ? "Done" : "Edit"}
            </button>
          </div>

          <div className="space-y-5">
            {experience.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="space-y-4">
                  <InputField
                    label="Company"
                    value={item.company}
                    onChange={(value) =>
                      updateExperience(index, "company", value)
                    }
                    placeholder="Enter company name"
                    disabled={!editMode}
                  />

                  <InputField
                    label="Role"
                    value={item.role}
                    onChange={(value) =>
                      updateExperience(index, "role", value)
                    }
                    placeholder="Enter job title"
                    disabled={!editMode}
                  />

                  <InputField
                    label="Duration"
                    value={item.duration}
                    onChange={(value) =>
                      updateExperience(index, "duration", value)
                    }
                    placeholder="Example: Jan 2025 - Present"
                    disabled={!editMode}
                  />
                </div>

                {editMode && experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="mt-4 font-semibold text-red-600"
                  >
                    Remove Experience
                  </button>
                )}
              </div>
            ))}
          </div>

          {editMode && (
            <button
              type="button"
              onClick={addExperience}
              className="mt-4 w-full rounded-lg bg-blue-50 py-3 font-semibold text-blue-700"
            >
              + Add Experience
            </button>
          )}
        </section>

        {/* About Me */}
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              About Me
            </h3>

            <button
              type="button"
              onClick={toggleEdit}
              className="font-semibold text-blue-600"
            >
              {editMode ? "Done" : "Edit"}
            </button>
          </div>

          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            disabled={!editMode}
            rows={5}
            placeholder="Write a short introduction about yourself"
            className="w-full resize-y rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 disabled:bg-gray-50"
          />
        </section>

        {/* Resume */}
        <section className="rounded-2xl bg-white p-5 text-center shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Resume</h3>

          <p className="mt-2 text-sm text-gray-500">
            No resume created yet.
          </p>

          <button
            type="button"
            onClick={() => navigate("/job-seeker/resume")}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm"
          >
            Open Resume Builder
          </button>
        </section>
      </main>

      {/* Save Button */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 p-3 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={saveProfile}
            className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {saveMessage && (
        <div className="fixed bottom-32 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg">
          {saveMessage}
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

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50 disabled:text-gray-500"
      />
    </label>
  );
}