function JobCard({
  title,
  company,
  location,
  salary,
  type,
  description,
  skills = [],
}) {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
      <div className="p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-lg font-medium text-blue-600">
              {company}
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            {type}
          </span>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Location
            </p>

            <p className="mt-1 font-medium text-slate-800">
              {location}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Salary
            </p>

            <p className="mt-1 font-medium text-slate-800">
              {salary}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Job Description
          </h3>

          <p className="leading-7 text-slate-600">
            {description}
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard