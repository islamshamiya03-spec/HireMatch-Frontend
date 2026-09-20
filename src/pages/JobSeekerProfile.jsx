import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const defaultProfile = {
  name: 'Your Name',
  email: 'your@email.com',
  role: 'Frontend Developer',
  location: 'Kolkata',
  skills: 'React, JavaScript, HTML, CSS',
  about:
    'Aspiring software developer interested in web development and technology.',
}

function JobSeekerProfile() {
  const [profile, setProfile] = useState(defaultProfile)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const storedProfile = localStorage.getItem('jobSeekerProfile')

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))

    setSaved(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem(
      'jobSeekerProfile',
      JSON.stringify(profile),
    )

    setSaved(true)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/job-seeker"
            className="text-xl font-bold text-blue-600"
          >
            HireMatch
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              to="/job-seeker"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Jobs
            </Link>

            <Link
              to="/job-seeker/matches"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Matches
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Job Seeker
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Profile
          </h1>

          <p className="mt-2 text-slate-600">
            Keep your profile information updated.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Preferred Role
              </label>

              <input
                id="role"
                name="role"
                type="text"
                value={profile.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={profile.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="skills"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Skills
            </label>

            <input
              id="skills"
              name="skills"
              type="text"
              value={profile.skills}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="about"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              About Me
            </label>

            <textarea
              id="about"
              name="about"
              rows="5"
              value={profile.about}
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            {saved ? (
              <p className="text-sm font-medium text-green-600">
                Profile saved successfully.
              </p>
            ) : (
              <span />
            )}

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Save Profile
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default JobSeekerProfile