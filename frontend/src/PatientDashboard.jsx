import React, { useState, useContext } from "react";
import Modal from "react-modal"; // For the modal dialog
import { ReportContext } from "./ReportContext"; // Context to interact with the smart contract

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedReport, setSelectedReport] = useState(null); // Report selected for sharing
  const [doctorToken, setDoctorToken] = useState(""); // Doctor's token
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

  // Open modal to input doctor's token
  const handleShare = (report) => {
    setSelectedReport(report); // Set the selected report
    setIsModalOpen(true); // Open the modal
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)', // Centering modal
      width: '400px', // Set width of modal
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Adding a light shadow
      backgroundColor: '#fff', // Background color of the modal
    },
  
  }

  // Handle sharing the report with the doctor through Solana smart contract
  const confirmShare = async () => {
    if (doctorToken) {
      // Call the context function to share the report with the doctor's token
      try {
        await shareReport(selectedReport, doctorToken); // Interact with the smart contract
        alert(`${selectedReport.name} shared with the doctor!`);
        setIsModalOpen(false); // Close the modal
        setDoctorToken(""); // Reset the doctor token input
      } catch (error) {
        console.error("Error sharing report:", error);
        alert("Failed to share the report.");
      }
    } else {
      alert("Please enter the doctor's token.");
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
            <li
              key={report.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
            >
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

      {/* Modal for entering doctor's token */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Doctor Token"
        style={customStyles}
      >
        <h2 className="text-xl font-bold mb-4">Enter Doctor's Token</h2>
        <input
          type="text"
          value={doctorToken}
          onChange={(e) => setDoctorToken(e.target.value)}
          placeholder="Doctor's Token"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={confirmShare}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Share Report
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default PatientDashboard;
