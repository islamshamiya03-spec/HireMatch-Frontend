import { useEffect, useState } from 'react'
import { Link } from 'react-router'

function Matches() {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const storedMatches = JSON.parse(
      localStorage.getItem('jobSeekerMatches') || '[]',
    )

    setMatches(storedMatches)
  }, [])

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
              to="/job-seeker/profile"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Job Seeker
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Your Matches
          </h1>

          <p className="mt-2 text-slate-600">
            Jobs you have liked will appear here.
          </p>
        </div>

        {matches.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg">
            <div className="text-5xl">♡</div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              No matches yet
            </h2>

            <p className="mt-2 text-slate-600">
              Go to the dashboard and like some jobs.
            </p>

            <Link
              to="/job-seeker"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {matches.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {job.title}
                    </h2>

                    <p className="mt-1 font-medium text-blue-600">
                      {job.company}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Liked
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">
                      Location:
                    </span>{' '}
                    {job.location}
                  </p>

                  <p>
                    <span className="font-semibold text-slate-800">
                      Salary:
                    </span>{' '}
                    {job.salary}
                  </p>

                  <p>
                    <span className="font-semibold text-slate-800">
                      Type:
                    </span>{' '}
                    {job.type}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Matches