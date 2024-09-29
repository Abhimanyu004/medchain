import React, { useState, createContext, useEffect } from "react";

// Create context for managing shared reports
export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [sharedReports, setSharedReports] = useState([]);

  // Load shared reports from local storage on component mount
  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("sharedReports")) || [];
    setSharedReports(storedReports);
  }, []);

  // Save the shared reports to local storage whenever they are updated
  useEffect(() => {
    if (sharedReports.length > 0) {
      localStorage.setItem("sharedReports", JSON.stringify(sharedReports));
    }
  }, [sharedReports]);

  // Function to share a report with the doctor and store in localStorage
  const shareReport = (report) => {
    setSharedReports((prevReports) => {
      const updatedReports = [...prevReports, report];
      localStorage.setItem("sharedReports", JSON.stringify(updatedReports)); // Save to localStorage
      return updatedReports;
    });
  };

  return (
    <ReportContext.Provider value={{ sharedReports, shareReport }}>
      {children}
    </ReportContext.Provider>
  );
};
