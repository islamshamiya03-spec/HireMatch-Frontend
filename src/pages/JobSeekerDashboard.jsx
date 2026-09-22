import { useState } from 'react'
import { Link } from 'react-router'
import JobCard from '../components/JobCard'
import SwipeButtons from '../components/SwipeButtons'

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechNova Solutions',
    location: 'Kolkata',
    salary: '₹4 - 6 LPA',
    type: 'Full Time',
    description:
      'Build responsive and user-friendly web applications using modern frontend technologies.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 2,
    title: 'Software Engineer',
    company: 'CodeSphere Pvt Ltd',
    location: 'Bengaluru',
    salary: '₹5 - 8 LPA',
    type: 'Full Time',
    description:
      'Work with the development team to build scalable software solutions and maintain application features.',
    skills: ['Java', 'Python', 'SQL', 'Git'],
  },
  {
    id: 3,
    title: 'Web Developer Intern',
    company: 'PixelWorks',
    location: 'Remote',
    salary: '₹15,000 - ₹25,000/month',
    type: 'Internship',
    description:
      'Assist the web development team in creating and improving modern websites and web applications.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
]

function JobSeekerDashboard() {
  const [availableJobs, setAvailableJobs] = useState(jobs)
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const filteredJobs = availableJobs.filter((job) => {
    const searchableText = [
      job.title,
      job.company,
      job.location,
      ...job.skills,
    ]
      .join(' ')
      .toLowerCase()

    return searchableText.includes(normalizedSearchTerm)
  })

  const currentJob = filteredJobs[0]

  const moveToNextJob = (jobId) => {
    setAvailableJobs((currentJobs) =>
      currentJobs.filter((job) => job.id !== jobId),
    )
  }

  const handleLike = () => {
    if (!currentJob) return

    const existingMatches = JSON.parse(
      localStorage.getItem('jobSeekerMatches') || '[]',
    )

    const alreadyMatched = existingMatches.some(
      (job) => job.id === currentJob.id,
    )

    if (!alreadyMatched) {
      localStorage.setItem(
        'jobSeekerMatches',
        JSON.stringify([...existingMatches, currentJob]),
      )
    }

    setMessage(`Liked ${currentJob.title} at ${currentJob.company}`)
    moveToNextJob(currentJob.id)
  }

  const handlePass = () => {
    if (!currentJob) return

    setMessage(`Passed ${currentJob.title}`)
    moveToNextJob(currentJob.id)
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

            <Link
              to="/job-seeker/profile"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6">
        <div className="mb-8 w-full max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Job Seeker
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Find your next opportunity
          </h1>

          <p className="mt-2 text-slate-600">
            Browse jobs and swipe according to your interest.
          </p>

          <label htmlFor="job-search" className="sr-only">
            Search jobs
          </label>
          <input
            id="job-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search jobs by title, company, location or skills..."
            className="mt-6 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {message && (
          <div className="mb-5 w-full max-w-2xl rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
            {message}
          </div>
        )}

        {currentJob ? (
          <>
            <JobCard
              title={currentJob.title}
              company={currentJob.company}
              location={currentJob.location}
              salary={currentJob.salary}
              type={currentJob.type}
              description={currentJob.description}
              skills={currentJob.skills}
            />

            <SwipeButtons
              onPass={handlePass}
              onLike={handleLike}
            />

            <p className="mt-4 text-sm text-slate-500">
              {filteredJobs.length} job{filteredJobs.length === 1 ? '' : 's'}
              {' '}available
            </p>
          </>
        ) : searchTerm && availableJobs.length > 0 ? (
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900">
              No jobs found for your search.
            </h2>
            <p className="mt-2 text-slate-600">
              Try searching by title, company, location, or skills.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg">
            <div className="text-5xl">✓</div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              No more jobs
            </h2>

            <p className="mt-2 text-slate-600">
              You have gone through all available jobs.
            </p>

            <Link
              to="/job-seeker/matches"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              View Matches
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export default JobSeekerDashboard
