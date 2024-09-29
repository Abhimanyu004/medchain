import React, { useState, useContext } from "react";
import { ReportContext } from "./ReportContext";

// Utility function to convert file to Base64
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function PatientDashboard() {
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState(null);
  const { shareReport } = useContext(ReportContext); // Get shareReport from context

  // Handle report upload and convert to Base64
  const handleUpload = async () => {
    if (file) {
      const base64Image = await toBase64(file); // Convert file to base64 string
      const newReport = { id: Date.now(), name: file.name, file: base64Image }; // Store base64 string in report
      setReports([...reports, newReport]);
      setFile(null);
    }
  };

  // Handle sharing the report with the doctor
  const handleShare = (report) => {
    const confirmShare = window.confirm("Do you want to share this report with the doctor?");
    if (confirmShare) {
      shareReport(report); // Share report through context
      alert(`${report.name} shared with the doctor!`);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Manage Your Medical Reports
      </h2>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 p-2 w-full"
        />
        <button
          onClick={handleUpload}
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Upload Report
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mt-8">Your Reports</h3>
        <ul className="mt-4 space-y-4">
          {reports.map((report) => (
            <li key={report.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <span>{report.name}</span>
              <button
                onClick={() => handleShare(report)}
                className="text-blue-500"
              >
                Share with Doctor
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PatientDashboard;
