import React, { useState } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [reports] = useState([
    { id: 1, doctorName: 'Dr. John Doe', speciality: 'Cardiology', fileUrl: '/patient_report.pdf' },
    { id: 2, doctorName: 'Dr. Jane Smith', speciality: 'Dermatology', fileUrl: '/patient_report.pdf' }
  ]);

  return (
    <div className="reports-layout-container">
      <h2>Reports</h2>
      <table className="reports-layout-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <a 
                  href={report.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="report-action-btn view-btn"
                >
                  View Report
                </a>
              </td>
              <td>
                <a 
                  href={report.fileUrl} 
                  download={`report_${report.doctorName.replace(/\s+/g, '_')}.pdf`}
                  className="report-action-btn download-btn"
                >
                  Download Report
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
