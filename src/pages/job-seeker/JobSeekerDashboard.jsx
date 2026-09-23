import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const bottomNavItems = [
  { label: "Home", icon: "⌂", path: "/job-seeker" },
  { label: "Search", icon: "⌕", path: "/job-seeker/jobs" },
  { label: "Matched", icon: "★", path: "/job-seeker/matched-jobs" },
  { label: "Applications", icon: "▤", path: "/job-seeker/applications" },
  { label: "Profile", icon: "◉", path: "/job-seeker/profile" },
];

const employmentOptions = [
  "Full-time",
  "Part-time",
  "Internship",
  "Remote",
];

function SectionHeader({ title, sectionKey, editMode, toggleEdit }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
        {title}
      </h2>

      <button
        type="button"
        onClick={() => toggleEdit(sectionKey)}
        className="rounded-lg px-3 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
      >
        {editMode[sectionKey] ? "Done" : "Edit"}
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
  type = "text",
  placeholder = "",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-500"
            : "border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }`}
      />
    </label>
  );
}

export default function JobSeekerProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  // Section edit states
  const [editMode, setEditMode] = useState({
    basicInfo: false,
    careerPrefs: false,
    skills: false,
    languages: false,
    education: false,
    experience: false,
    aboutMe: false,
    resume: false,
  });

  // Basic Information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [locationValue, setLocationValue] = useState("");

  // Career Preferences
  const [professionalHeadline, setProfessionalHeadline] = useState("");
  const [desiredRole, setDesiredRole] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");

  // Technical Skills
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
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  // Experience
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [experienceDescription, setExperienceDescription] = useState("");

  // About Me
  const [aboutMe, setAboutMe] = useState("");

  // Save message
  const [saveMessage, setSaveMessage] = useState("");

  // Static for now
  const profileCompletion = 75;

  function toggleEdit(section) {
    setEditMode((previous) => ({
      ...previous,
      [section]: !previous[section],
    }));
  }

  function addSkill() {
    const value = newSkill.trim();

    if (value && !skills.includes(value)) {
      setSkills((previous) => [...previous, value]);
      setNewSkill("");
    }
  }

  function removeSkill(skillToRemove) {
    setSkills((previous) =>
      previous.filter((skill) => skill !== skillToRemove)
    );
  }

  function addLanguage() {
    const value = newLanguage.trim();

    if (value && !languages.includes(value)) {
      setLanguages((previous) => [...previous, value]);
      setNewLanguage("");
    }
  }

  function removeLanguage(languageToRemove) {
    setLanguages((previous) =>
      previous.filter((language) => language !== languageToRemove)
    );
  }

  function saveProfile() {
    setSaveMessage("Profile saved successfully.");

    setEditMode({
      basicInfo: false,
      careerPrefs: false,
      skills: false,
      languages: false,
      education: false,
      experience: false,
      aboutMe: false,
      resume: false,
    });

    window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  }

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progressOffset =
    circumference - (profileCompletion / 100) * circumference;

  return (
    <div className="min-h-screen bg-slate-50 pb-36 text-slate-900">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">

          <button
            type="button"
            onClick={() => navigate("/job-seeker")}
            className="rounded-xl px-2 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
          >
            ← Home
          </button>

          <div className="text-xl font-black tracking-tight sm:text-2xl">
            <span className="text-blue-600">Hire</span>
            <span className="text-slate-950">Match</span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/job-seeker")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm"
            aria-label="Dashboard"
          >
            ⌂
          </button>

        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-5">

        {/* ================= PROFILE HERO ================= */}
        <section className="mb-6 overflow-hidden rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="relative flex flex-col items-center text-center">

            {/* Progress Ring */}
            <div className="relative mb-4">
              <svg
                width="132"
                height="132"
                viewBox="0 0 132 132"
                className="-rotate-90"
                aria-label={`${profileCompletion}% profile complete`}
              >
                <circle
                  cx="66"
                  cy="66"
                  r={radius}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />

                <circle
                  cx="66"
                  cy="66"
                  r={radius}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                />
              </svg>

              {/* Generic Avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-3xl text-white shadow-lg">
                  👤
                </div>
              </div>

              {/* Edit Avatar */}
              <button
                type="button"
                onClick={() =>
                  alert("Profile picture editing will be connected later.")
                }
                className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-sm font-bold text-white shadow-md"
                aria-label="Edit profile picture"
              >
                ✎
              </button>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-950">
              Your Profile
            </h1>

            <p className="mt-1 font-bold text-blue-600">
              Build your profile for better job matches
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Add your information to help employers understand your profile.
            </p>

            {/* Completion */}
            <div className="mt-5 w-full">

              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">
                  Profile Complete
                </span>

                <span className="text-sm font-black text-blue-600">
                  {profileCompletion}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-blue-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>

              <p className="mt-2 text-left text-xs leading-5 text-slate-500">
                Complete your profile to improve your job matches.
              </p>
            </div>
          </div>
        </section>

        {/* ================= BASIC INFORMATION ================= */}
        <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

          <SectionHeader
            title="Basic Information"
            sectionKey="basicInfo"
            editMode={editMode}
            toggleEdit={toggleEdit}
          />

          <div className="space-y-4">

            <Field
              label="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              disabled={!editMode.basicInfo}
              placeholder="Enter your full name"
            />

            <Field
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={!editMode.basicInfo}
              placeholder="Enter your email"
            />

            <Field
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              disabled={!editMode.basicInfo}
              placeholder="Enter your phone number"
            />

            <Field
              label="Current Location"
              value={locationValue}
              onChange={(event) => setLocationValue(event.target.value)}
              disabled={!editMode.basicInfo}
              placeholder="Enter your current location"
            />

          </div>
        </section>

        {/* ================= CAREER PREFERENCES ================= */}
        <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

          <SectionHeader
            title="Career Preferences"
            sectionKey="careerPrefs"
            editMode={editMode}
            toggleEdit={toggleEdit}
          />

          <div className="space-y-4">

            <Field
              label="Professional Headline"
              value={professionalHeadline}
              onChange={(event) =>
                setProfessionalHeadline(event.target.value)
              }
              disabled={!editMode.careerPrefs}
              placeholder="Example: Frontend Developer"
            />

            <Field
              label="Desired Job Role"
              value={desiredRole}
              onChange={(event) => setDesiredRole(event.target.value)}
              disabled={!editMode.careerPrefs}
              placeholder="Example: Software Engineer"
            />

            <Field
              label="Preferred Job Location"
              value={preferredLocation}
              onChange={(event) =>
                setPreferredLocation(event.target.value)
              }
              disabled={!editMode.careerPrefs}
              placeholder="Example: Kolkata / Remote"
            />

            <Field
              label="Expected Salary"
              value={expectedSalary}
              onChange={(event) => setExpectedSalary(event.target.value)}
              disabled={!editMode.careerPrefs}
              placeholder="Example: ₹6,00,000 / year"
            />

            <div>
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Employment Type
              </p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {employmentOptions.map((option) => {
                  const selected = employmentType === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={!editMode.careerPrefs}
                      onClick={() => setEmploymentType(option)}
                      className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                        selected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 bg-white text-slate-600"
                      } ${
                        !editMode.careerPrefs
                          ? "cursor-not-allowed opacity-70"
                          : "hover:border-blue-300"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ================= TECHNICAL SKILLS ================= */}
        <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

          <SectionHeader
            title="Technical Skills"
            sectionKey="skills"
            editMode={editMode}
            toggleEdit={toggleEdit}
          />

          <div className="flex flex-wrap gap-2">

            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700"
              >
                {skill}

                {editMode.skills && (
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="font-black text-blue-500 hover:text-blue-900"
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}

          </div>

          {editMode.skills && (
            <form
              className="mt-4 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                addSkill();
              }}
            >
              <input
                type="text"
                value={newSkill}
                onChange={(event) => setNewSkill(event.target.value)}
                placeholder="Add a skill"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Add
              </button>
            </form>
          )}

        </section>

        {/* ================= LANGUAGES ================= */}
        <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

          <SectionHeader
            title="Languages You Are Great At"
            sectionKey="languages"
            editMode={editMode}
            toggleEdit={toggleEdit}
          />

          <div className="flex flex-wrap gap-2">

            {languages.map((language) => (
              <span
                key={language}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700"
              >
                {language}

                {editMode.languages && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(language)}
                    className="font-black text-slate-500 hover:text-slate-900"
                    aria-label={`Remove ${language}`}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}

          </div>

          {editMode.languages && (
            <form
              className="mt-4 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                addLanguage();
              }}
            >
              <input
                type="text"
                value={newLanguage}
                onChange={(event) => setNewLanguage(event.target.value)}
                placeholder="Add a language"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Add
              </button>
            </form>
          )}

        </section>

        {/* ================= EDUCATION ================= */}
        <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

          <SectionHeader
            title="Education"
            sectionKey="education"
            editMode={editMode}
            toggleEdit={toggleEdit}
          />

          <div className="space-y-4">

            <Field
              label="Degree / Qualification"
              value={degree}
              onChange={(event) => setDegree(event.target.value)}
              disabled={!editMode.education}
              placeholder="Enter your degree or qualification"
            />

            <Field
              label="Institution"
              value={institution}
              onChange={(event) => setInstitution(event.target.value)}
              disabled={!editMode.education}
              placeholder="Enter your institution"
            />

            <Field
              label="Graduation Year"
              type="number"
              value={graduationYear}
              onChange={(event) => setGraduationYear(event.target.value)}
              disabled={!editMode.education}
              placeholder="Example: 2026"
            />

          </div>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

          <SectionHeader
            title="Experience"
            sectionKey="experience"
            editMode={editMode}
            toggleEdit={toggleEdit}
          />

          <div className="space-y-4">

            <Field
              label="Job Title"
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              disabled={!editMode.experience}
              placeholder="Example: Software Developer"
            />

            <Field
              label="Company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              disabled={!editMode.experience}
              placeholder="Enter company name"
            />

            <Field
              label="Years of Experience"
              type="number"
              value={yearsOfExperience}
              onChange={(event) =>
                setYearsOfExperience(event.target.value)
              }
              disabled={!editMode.experience}
              placeholder="Example: 2"
            />

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Experience Description
              </span>

              <textarea
                rows="4"
                value={experienceDescription}
                onChange={(event) =>
                  setExperienceDescription(event.target.value)
                }
                disabled={!editMode.experience}
                placeholder="Describe your experience, responsibilities and achievements."
                className={`w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  editMode.experience
                    ? "border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-500"
                }`}
              />
            </label>

          </div>
        </section>

        {/* ================= ABOUT ME ================= */}
        <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

          <SectionHeader
            title="About Me"
            sectionKey="aboutMe"
            editMode={editMode}
            toggleEdit={toggleEdit}
          />

          <textarea
            rows="5"
            value={aboutMe}
            onChange={(event) => setAboutMe(event.target.value)}
            disabled={!editMode.aboutMe}
            placeholder="Tell employers briefly about yourself, your experience and career goals."
            className={`w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none transition ${
              editMode.aboutMe
                ? "border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-500"
            }`}
          />

        </section>

        {/* ================= RESUME ================= */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

          <SectionHeader
            title="Resume"
            sectionKey="resume"
            editMode={editMode}
            toggleEdit={toggleEdit}
          />

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-sm font-bold text-slate-800">
              No resume uploaded yet
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Upload your resume later to improve your job matching.
            </p>

          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() => alert("Upload Resume UI only")}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Upload Resume
            </button>

            <button
              type="button"
              onClick={() => alert("Update Resume UI only")}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Update Resume
            </button>

          </div>
        </section>
      </main>

      {/* ================= STICKY SAVE BUTTON ================= */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_15px_rgba(0,0,0,0.06)] backdrop-blur">
        <div className="mx-auto max-w-3xl">

          <button
            type="button"
            onClick={saveProfile}
            className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-blue-700"
          >
            Save Profile
          </button>

        </div>
      </div>

      {/* ================= SAVE CONFIRMATION ================= */}
      {saveMessage && (
        <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-xl bg-emerald-600 px-5 py-3 text-center text-sm font-bold text-white shadow-lg">
          {saveMessage}
        </div>
      )}

      {/* ================= BOTTOM NAVIGATION ================= */}
      <nav
        aria-label="Primary Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.06)]"
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-around px-2">

          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.path)}
                className={`flex min-w-[58px] flex-col items-center justify-center rounded-xl px-2 py-1 transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-lg">
                  {item.icon}
                </span>

                <span className="mt-0.5 text-[10px] font-bold">
                  {item.label}
                </span>
              </button>
            );
          })}

        </div>
      </nav>
    </div>
  );
}
