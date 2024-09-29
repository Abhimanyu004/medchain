import React from "react";

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="text-center text-white space-y-6">
        <h1 className="text-5xl font-bold">Doctor-Patient Platform</h1>
        <p className="text-xl">
          Seamlessly connect doctors and patients, securely sharing medical reports.
        </p>
        <div className="space-x-4">
          <a
            href="/doctor/dashboard"
            className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            Doctor Dashboard
          </a>
          <a
            href="/patient/dashboard"
            className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            Patient Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
