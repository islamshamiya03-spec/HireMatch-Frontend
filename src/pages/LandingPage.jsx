import React from "react";
import { useNavigate } from "react-router";
export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/job-seeker");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">HireMatch</h1>
        <p className="text-lg text-blue-900 mb-6 font-semibold">
          AI-Powered Job Matching and Job Search Platform
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Group Members</h2>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>Aryan sinha Roy</li>
            <li>Shamiya Islam</li>
            <li>Eshita Naskar</li>
            <li>Soumajit Kar</li>
            <li>Susmita Maiti</li>
          </ul>
        </section>

        <p className="text-blue-700 mb-8 leading-relaxed">
          HireMatch is a job-seeking platform that helps users discover relevant job
          opportunities, search for jobs, and find jobs based on their profile and skills.
        </p>

        <button
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 text-white font-semibold py-3 px-6 rounded-md transition-colors sm:w-auto w-full"
          aria-label="Get Started"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
