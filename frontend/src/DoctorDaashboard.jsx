import React, { useContext } from "react";
import { ReportContext } from "./ReportContext";

function DoctorDashboard() {
  const { sharedReports } = useContext(ReportContext); // Access shared reports from context

  return (
    <div className="min-h-screen p-8 bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Patient Shared Reports
      </h2>
      <div className="max-w-4xl mx-auto">
        {sharedReports.length === 0 ? (
          <p className="text-center text-gray-600">No reports shared yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sharedReports.map((report) => (
              <div key={report.id} className="p-6 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-700">{report.name}</h3>
                {/* Check if the report is an image (base64 string) and render it */}
                {report.file && (
                  <img
                    src={report.file}
                    alt={report.name}
                    className="mt-4 w-full h-auto object-cover rounded-lg"
                  />
                )}
                <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  View Report
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;
