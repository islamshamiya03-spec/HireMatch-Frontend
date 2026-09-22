import { Link } from 'react-router'

function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-100/50">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-12 text-white sm:px-12 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Student Project
            </p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">HireMatch</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50">
              A Tinder-like recruitment platform that helps job seekers and
              employers discover the right opportunities through mutual
              matching.
            </p>

            <Link
              to="/job-seeker"
              className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Get Started
            </Link>
          </div>

          <div className="grid gap-8 px-6 py-10 sm:px-12 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">About HireMatch</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Job seekers can browse and show interest in jobs, while
                employers can do the same for candidates. When both sides are
                interested, they match, communicate, and can schedule an
                interview.
              </p>
              <p className="mt-3 leading-7 text-slate-600">
                The platform also considers skills, experience, salary
                expectations, location, and job requirements to recommend
                suitable matches.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">Group Members</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">
                  Aryan Sinha Roy
                </li>
                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">
                  Shamiya Islam
                </li>
                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">
                  Eshita Naskar
                </li>
                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">
                  Soumyajit Kar
                </li>
                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">
                  Susmita Maiti
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default LandingPage
