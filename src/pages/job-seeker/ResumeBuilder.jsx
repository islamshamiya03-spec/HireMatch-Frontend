// src/pages/job-seeker/ResumeBuilder.jsx
import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";

const bottomNavItems = [
  { label: "Home", icon: "🏠", path: "/job-seeker" },
  { label: "Search", icon: "🔍", path: "/job-seeker/jobs" },
  { label: "Matched", icon: "⭐", path: "/job-seeker/matched-jobs" },
  { label: "Applications", icon: "📄", path: "/job-seeker/applications" },
  { label: "Profile", icon: "👤", path: "/job-seeker/profile" },
];

function SectionHeader({ title }) {
  return (
    <h3 className="text-xl font-semibold text-blue-900 mb-4">{title}</h3>
  );
}

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const location = useLocation();

  // State for the resume data
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
  });

  const [summary, setSummary] = useState("");

  const [education, setEducation] = useState([
    { degree: "", institution: "", graduationYear: "", coursework: "" },
  ]);
  const [experience, setExperience] = useState([
    {
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    },
  ]);
  const [projects, setProjects] = useState([
    { name: "", technologies: "", description: "", link: "" },
  ]);
  const [skills, setSkills] = useState(["HTML", "CSS", "React", "DSA"]);
  const [newSkill, setNewSkill] = useState("");
  const [languages, setLanguages] = useState(["English", "Bengali", "Hindi"]);
  const [newLanguage, setNewLanguage] = useState("");
  const [certifications, setCertifications] = useState([
    { name: "", organization: "", year: "", link: "" },
  ]);
  const [achievements, setAchievements] = useState([""]);

  // Save confirmation message
  const [saveMessage, setSaveMessage] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({});

  // Scroll ref for preview
  const previewRef = useRef(null);

  // Helper Functions (moved before return)

  // Validation check on save
  function validate() {
    const errs = {};
    if (!personalInfo.fullName.trim()) {
      errs.fullName = "Full Name is required";
    }
    if (!personalInfo.email.trim()) {
      errs.email = "Email is required";
    } else {
      // Basic email pattern check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(personalInfo.email.trim())) {
        errs.email = "Invalid email format";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handlePersonalChange(e) {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  }

  function addSkill() {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  }
  function removeSkill(skillToRemove) {
    setSkills(skills.filter((s) => s !== skillToRemove));
  }

  function addLanguage() {
    const trimmed = newLanguage.trim();
    if (trimmed && !languages.includes(trimmed)) {
      setLanguages([...languages, trimmed]);
      setNewLanguage("");
    }
  }
  function removeLanguage(langToRemove) {
    setLanguages(languages.filter((l) => l !== langToRemove));
  }

  function updateEducation(index, field, value) {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  }
  function removeEducation(index) {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  }
  function addEducation() {
    setEducation([...education, { degree: "", institution: "", graduationYear: "", coursework: "" }]);
  }

  function updateExperience(index, field, value) {
    const updated = [...experience];
    updated[index][field] = value;
    if (field === "currentlyWorking" && value === true) {
      updated[index].endDate = "";
    }
    setExperience(updated);
  }
  function removeExperience(index) {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    }
  }
  function addExperience() {
    setExperience([...experience, {
      jobTitle: "", company: "", location: "", startDate: "", endDate: "", currentlyWorking: false, description: "",
    }]);
  }

  function updateProject(index, field, value) {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  }
  function removeProject(index) {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  }
  function addProject() {
    setProjects([...projects, { name: "", technologies: "", description: "", link: "" }]);
  }

  function updateCertification(index, field, value) {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  }
  function removeCertification(index) {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((_, i) => i !== index));
    }
  }
  function addCertification() {
    setCertifications([...certifications, { name: "", organization: "", year: "", link: "" }]);
  }

  function updateAchievement(index, value) {
    const updated = [...achievements];
    updated[index] = value;
    setAchievements(updated);
  }
  function removeAchievement(index) {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    }
  }
  function addAchievement() {
    setAchievements([...achievements, ""]);
  }

  function clearResume() {
    if (window.confirm("Are you sure you want to clear your resume?")) {
      setPersonalInfo({ fullName: "", headline: "", email: "", phone: "", location: "" });
      setSummary("");
      setEducation([{ degree: "", institution: "", graduationYear: "", coursework: "" }]);
      setExperience([
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ]);
      setProjects([{ name: "", technologies: "", description: "", link: "" }]);
      setSkills(["HTML", "CSS", "React", "DSA"]);
      setLanguages(["English", "Bengali", "Hindi"]);
      setCertifications([{ name: "", organization: "", year: "", link: "" }]);
      setAchievements([""]);
      setErrors({});
      setSaveMessage("Resume cleared.");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  }

  function saveResume() {
    if (validate()) {
      setSaveMessage("Resume saved successfully.");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  }

  function scrollToPreview() {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
  }

  // -------------------- RETURN --------------------
  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* PREMIUM MOBILE HEADER */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-md rounded-b-xl px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/job-seeker")}
          aria-label="Back to Dashboard"
          className="text-blue-700 font-semibold text-lg p-1"
          type="button"
        >
          ← Home
        </button>
        <h1 className="font-extrabold text-xl text-center select-none">
          <span className="text-blue-600">Hire</span>
          <span className="text-slate-900">Match</span>
        </h1>
        <button
          onClick={scrollToPreview}
          aria-label="Scroll to Resume Preview"
          className="text-blue-700 font-semibold text-lg p-1"
          type="button"
        >
          Preview
        </button>
      </header>

      <main className="flex-grow px-4 py-5 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        {/* LEFT SIDE: FORM */}
        <section aria-label="Resume Builder Form" className="space-y-8">
          {/* INTRO */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-1">
              Build Your Resume
            </h2>
            <p className="text-blue-700 mb-2">
              Create a professional resume that helps employers understand your skills and experience.
            </p>
            <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden" aria-label="Resume completion 60%">
              <div
                className="bg-blue-600 h-3"
                style={{ width: "60%" }}
              />
            </div>
            <p className="text-sm text-blue-700 mt-1 font-semibold">Resume Completion 60%</p>
          </div>

          {/* Personal Information */}
          <article className="bg-white rounded-xl shadow-md p-4">
            <SectionHeader title="Personal Information" />
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <label className="block">
                <span className="text-sm font-medium text-blue-800">Full Name *</span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={personalInfo.fullName}
                  onChange={handlePersonalChange}
                  className={`mt-1 block w-full rounded-md border p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.fullName ? "true" : "false"}
                  required
                />
                {errors.fullName && (
                  <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-blue-800">
                  Professional Headline
                </span>
                <input
                  type="text"
                  name="headline"
                  placeholder="Example: Frontend Developer"
                  value={personalInfo.headline}
                  onChange={handlePersonalChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-blue-800">Email *</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={personalInfo.email}
                  onChange={handlePersonalChange}
                  className={`mt-1 block w-full rounded-md border p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.email ? "true" : "false"}
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-blue-800">Phone Number</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={personalInfo.phone}
                  onChange={handlePersonalChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-blue-800">Location</span>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your location"
                  value={personalInfo.location}
                  onChange={handlePersonalChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </label>
            </form>
          </article>

          {/* Professional Summary */}
          <article className="bg-white rounded-xl shadow-md p-4">
            <SectionHeader title="Professional Summary" />
            <textarea
              aria-label="Professional summary"
              placeholder="Write a short professional summary describing your experience, strengths and career goals."
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 resize-y"
            />
          </article>

          {/* Education */}
          <article className="bg-white rounded-xl shadow-md p-4">
            <SectionHeader title="Education" />
            {education.map((edu, i) => (
              <div key={i} className="mb-4 last:mb-0 border-b border-gray-200 pb-4">
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">Degree / Qualification</span>
                  <input
                    type="text"
                    placeholder="Degree or qualification"
                    value={edu.degree}
                    onChange={(e) => updateEducation(i, "degree", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">Institution</span>
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => updateEducation(i, "institution", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">Graduation Year</span>
                  <input
                    type="number"
                    min="1900"
                    max="2100"
                    placeholder="Graduation year"
                    value={edu.graduationYear}
                    onChange={(e) => updateEducation(i, "graduationYear", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-blue-800">Relevant Coursework (optional)</span>
                  <input
                    type="text"
                    placeholder="Relevant coursework"
                    value={edu.coursework}
                    onChange={(e) => updateEducation(i, "coursework", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                {education.length > 1 && (
                  <button
                    className="mt-2 text-red-600 font-semibold"
                    type="button"
                    onClick={() => removeEducation(i)}
                  >
                    Remove Education
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded-md hover:bg-blue-200 transition"
              onClick={addEducation}
            >
              + Add Education
            </button>
          </article>

          {/* Work Experience */}
          <article className="bg-white rounded-xl shadow-md p-4">
            <SectionHeader title="Work Experience" />
            {experience.map((exp, i) => (
              <div key={i} className="mb-4 last:mb-0 border-b border-gray-200 pb-4">
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">Job Title</span>
                  <input
                    type="text"
                    placeholder="Job title"
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(i, "jobTitle", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">Company</span>
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(i, "company", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">Location</span>
                  <input
                    type="text"
                    placeholder="Location"
                    value={exp.location}
                    onChange={(e) => updateExperience(i, "location", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <div className="flex gap-4 mb-2 flex-wrap">
                  <label className="block flex-grow min-w-[140px]">
                    <span className="text-sm font-medium text-blue-800">Start Date</span>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(i, "startDate", e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </label>
                  {!exp.currentlyWorking && (
                    <label className="block flex-grow min-w-[140px]">
                      <span className="text-sm font-medium text-blue-800">End Date</span>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(i, "endDate", e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </label>
                  )}
                </div>
                <label className="inline-flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={exp.currentlyWorking}
                    onChange={(e) =>
                      updateExperience(i, "currentlyWorking", e.target.checked)
                    }
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-blue-700">Currently Working Here</span>
                </label>
                <label>
                  <span className="text-sm font-medium text-blue-800">
                    Description
                  </span>
                  <textarea
                    rows="3"
                    placeholder="Describe your role and achievements"
                    value={exp.description}
                    onChange={(e) => updateExperience(i, "description", e.target.value)}
                    className="mt-1 block w-full resize-y rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                {experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(i)}
                    className="mt-2 text-red-600 font-semibold"
                  >
                    Remove Experience
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded-md hover:bg-blue-200 transition"
            >
              + Add Experience
            </button>
          </article>

          {/* Projects */}
          <article className="bg-white rounded-xl shadow-md p-4">
            <SectionHeader title="Projects" />
            {projects.map((project, i) => (
              <div key={i} className="mb-4 last:mb-0 border-b border-gray-200 pb-4">
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">Project Name</span>
                  <input
                    type="text"
                    placeholder="Project name"
                    value={project.name}
                    onChange={(e) => updateProject(i, "name", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">Technologies Used</span>
                  <input
                    type="text"
                    placeholder="Technologies"
                    value={project.technologies}
                    onChange={(e) => updateProject(i, "technologies", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">Project Description</span>
                  <textarea
                    rows="3"
                    placeholder="Describe the project"
                    value={project.description}
                    onChange={(e) => updateProject(i, "description", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 resize-y"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-blue-800">Project Link (optional)</span>
                  <input
                    type="url"
                    placeholder="https://"
                    value={project.link}
                    onChange={(e) => updateProject(i, "link", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(i)}
                    className="mt-2 text-red-600 font-semibold"
                  >
                    Remove Project
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addProject}
              className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded-md hover:bg-blue-200 transition"
            >
              + Add Project
            </button>
          </article>

          {/* Technical Skills */}
          <article className="bg-white rounded-xl shadow-md p-4">
            <SectionHeader title="Technical Skills" />
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove skill ${skill}`}
                      className="ml-2 text-blue-600 hover:text-blue-900 font-bold focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addSkill();
                }}
                className="flex space-x-2"
                aria-label="Add skill form"
              >
                <input
                  type="text"
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-grow rounded-md border border-blue-300 p-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  aria-label="Add a skill"
                />
                <button
                  type="submit"
                  disabled={!newSkill.trim()}
                  className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white font-semibold px-4 rounded-md"
                >
                  Add
                </button>
              </form>
            </div>
          </article>

          {/* Languages */}
          <article className="bg-white rounded-xl shadow-md p-4">
            <SectionHeader title="Languages" />
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {languages.map((language) => (
                  <div
                    key={language}
                    className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium"
                  >
                    {language}
                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                      aria-label={`Remove language ${language}`}
                      className="ml-2 text-blue-600 hover:text-blue-900 font-bold focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addLanguage();
                }}
                className="flex space-x-2"
                aria-label="Add language form"
              >
                <input
                  type="text"
                  placeholder="Add a language"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="flex-grow rounded-md border border-blue-300 p-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  aria-label="Add a language"
                />
                <button
                  type="submit"
                  disabled={!newLanguage.trim()}
                  className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white font-semibold px-4 rounded-md"
                >
                  Add
                </button>
              </form>
            </div>
          </article>

          {/* Certifications */}
          <article className="bg-white rounded-xl shadow-md p-4">
            <SectionHeader title="Certifications" />
            {certifications.map((cert, i) => (
              <div key={i} className="mb-4 last:mb-0 border-b border-gray-200 pb-4">
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">
                    Certification Name
                  </span>
                  <input
                    type="text"
                    placeholder="Certification name"
                    value={cert.name}
                    onChange={(e) => updateCertification(i, "name", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">
                    Issuing Organization
                  </span>
                  <input
                    type="text"
                    placeholder="Organization"
                    value={cert.organization}
                    onChange={(e) => updateCertification(i, "organization", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-sm font-medium text-blue-800">Year</span>
                  <input
                    type="number"
                    min="1900"
                    max="2100"
                    placeholder="Year"
                    value={cert.year}
                    onChange={(e) => updateCertification(i, "year", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-blue-800">
                    Credential Link (optional)
                  </span>
                  <input
                    type="url"
                    placeholder="https://"
                    value={cert.link}
                    onChange={(e) => updateCertification(i, "link", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                {certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCertification(i)}
                    className="mt-2 text-red-600 font-semibold"
                  >
                    Remove Certification
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCertification}
              className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded-md hover:bg-blue-200 transition"
            >
              + Add Certification
            </button>
          </article>

          {/* Achievements */}
          <article className="bg-white rounded-xl shadow-md p-4">
            <SectionHeader title="Achievements" />
            {achievements.map((ach, i) => (
              <div key={i} className="mb-4 last:mb-0 border-b border-gray-200 pb-4 flex flex-col">
                <textarea
                  aria-label="Achievement"
                  rows={2}
                  placeholder="Won a college hackathon..."
                  value={ach}
                  onChange={(e) => updateAchievement(i, e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 resize-y"
                />
                {achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAchievement(i)}
                    className="mt-2 self-start text-red-600 font-semibold"
                  >
                    Remove Achievement
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addAchievement}
              className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded-md hover:bg-blue-200 transition"
            >
              + Add Achievement
            </button>
          </article>
        </section>

        {/* RIGHT SIDE: Resume Preview */}
        <section
          ref={previewRef}
          aria-label="Resume Preview"
          className="bg-white rounded-xl shadow-lg p-6 w-full max-w-full md:max-w-[400px] md:h-auto overflow-visible scroll-mt-16 md:sticky md:top-20"
          style={{ minWidth: 0 }}
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Resume Preview
          </h2>
          <article className="text-slate-900 font-sans">
            {personalInfo.fullName && (
              <h1 className="text-3xl font-extrabold">{personalInfo.fullName}</h1>
            )}
            {personalInfo.headline && (
              <p className="text-blue-700 font-semibold mb-3">{personalInfo.headline}</p>
            )}
            {(personalInfo.email ||
              personalInfo.phone ||
              personalInfo.location) && (
              <p className="text-sm text-blue-700 mb-6 space-y-1">
                {personalInfo.email && <span>Email: {personalInfo.email}</span>}
                {personalInfo.phone && <span>Phone: {personalInfo.phone}</span>}
                {personalInfo.location && <span>Location: {personalInfo.location}</span>}
              </p>
            )}
            {summary && (
              <>
                <h3 className="font-bold text-blue-800 text-lg mb-1">Professional Summary</h3>
                <p className="mb-4 whitespace-pre-wrap">{summary}</p>
              </>
            )}

            {skills.length > 0 && (
              <>
                <h3 className="font-bold text-blue-800 text-lg mb-1">Skills</h3>
                <ul className="flex flex-wrap gap-2 mb-4">
                  {skills.map((s) => (
                    <li
                      key={s}
                      className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {education.some((e) => Object.values(e).some((v) => v)) && (
              <>
                <h3 className="font-bold text-blue-800 text-lg mb-1">Education</h3>
                <ul className="mb-4">
                  {education.map((edu, i) =>
                    Object.values(edu).some((v) => v) ? (
                      <li key={i} className="mb-3">
                        <p className="font-semibold">{edu.degree || "—"}</p>
                        <p className="italic">{edu.institution || "—"}</p>
                        <p className="text-sm text-gray-600">
                          {edu.graduationYear || "—"}
                        </p>
                        {edu.coursework && (
                          <p className="text-sm mt-1">Coursework: {edu.coursework}</p>
                        )}
                      </li>
                    ) : null
                  )}
                </ul>
              </>
            )}

            {experience.some((exp) => Object.values(exp).some((v) => v)) && (
              <>
                <h3 className="font-bold text-blue-800 text-lg mb-1">Work Experience</h3>
                <ul className="mb-4">
                  {experience.map((exp, i) =>
                    Object.values(exp).some((v) => v) ? (
                      <li key={i} className="mb-4">
                        <p className="font-semibold text-lg">{exp.jobTitle || "—"}</p>
                        <p>
                          {exp.company || "—"} | {exp.location || "—"}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          {formatDate(exp.startDate)} -{" "}
                          {exp.currentlyWorking ? "Present" : formatDate(exp.endDate)}
                        </p>
                        <p className="whitespace-pre-wrap">{exp.description}</p>
                      </li>
                    ) : null
                  )}
                </ul>
              </>
            )}

            {projects.some((p) => Object.values(p).some((v) => v)) && (
              <>
                <h3 className="font-bold text-blue-800 text-lg mb-1">Projects</h3>
                <ul className="mb-4">
                  {projects.map((p, i) =>
                    Object.values(p).some((v) => v) ? (
                      <li key={i} className="mb-4">
                        <p className="font-semibold">{p.name || "—"}</p>
                        <p className="italic mb-1">
                          Technologies: {p.technologies || "—"}
                        </p>
                        <p className="mb-1 whitespace-pre-wrap">{p.description}</p>
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Project Link
                          </a>
                        )}
                      </li>
                    ) : null
                  )}
                </ul>
              </>
            )}

            {certifications.some((c) => Object.values(c).some((v) => v)) && (
              <>
                <h3 className="font-bold text-blue-800 text-lg mb-1">Certifications</h3>
                <ul className="mb-4 list-disc pl-5">
                  {certifications.map((c, i) =>
                    Object.values(c).some((v) => v) ? (
                      <li key={i}>
                        {c.name || "—"}, {c.organization || "—"} ({c.year || "—"})
                        {c.link && (
                          <>
                            {" "}
                            -{" "}
                            <a
                              href={c.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Credential
                            </a>
                          </>
                        )}
                      </li>
                    ) : null
                  )}
                </ul>
              </>
            )}

            {achievements.filter((a) => a.trim() !== "").length > 0 && (
              <>
                <h3 className="font-bold text-blue-800 text-lg mb-1">Achievements</h3>
                <ul className="mb-4 list-disc pl-5">
                  {achievements.map((a, i) =>
                    a.trim() ? <li key={i}>{a}</li> : null
                  )}
                </ul>
              </>
            )}

            {languages.length > 0 && (
              <>
                <h3 className="font-bold text-blue-800 text-lg mb-1">Languages</h3>
                <p>{languages.join(", ")}</p>
              </>
            )}
          </article>

          {/* Buttons */}
          <div className="flex gap-4 mt-8 flex-wrap justify-center">
            <button
              onClick={saveResume}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
              type="button"
            >
              Save Resume
            </button>
            <button
              onClick={clearResume}
              className="bg-gray-300 hover:bg-gray-400 text-blue-700 font-semibold px-6 py-3 rounded-lg shadow transition w-full max-w-xs"
              type="button"
            >
              Clear Resume
            </button>
            <button
              onClick={() => window.print()}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition w-full max-w-xs"
              type="button"
            >
              Print / Save as PDF
            </button>
          </div>
          {saveMessage && (
            <div className="mt-4 text-center bg-green-600 text-white px-5 py-2 rounded-xl shadow-lg select-none text-sm">
              {saveMessage}
            </div>
          )}
        </section>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav
        aria-label="Primary Navigation"
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow flex justify-around items-center h-16 z-50"
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
