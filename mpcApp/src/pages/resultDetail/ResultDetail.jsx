import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Download, ArrowLeft, CreditCard, FileText, User, Hash } from "lucide-react";
import "./resultDetail.css";

const ResultDetail = () => {
  const { state: result } = useLocation();
  const navigate = useNavigate();

  if (!result) return (
    <div className="error-container">
      <h2>No Data Found ❌</h2>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );

  const hasBacklog = result.subjects.some(s => s.result === "FAIL");

  return (
    <div className="detail-page">
      <div className="detail-header">
        <button className="icon-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Grade Sheet Details</h1>
      </div>

      <div className="detail-card">
        {/* Student Profile Header */}
        <div className="student-profile-section">
          <div className="info-item">
            <User size={18} className="icon" />
            <div>
              <label>Student Name</label>
              <p>{result.name}</p>
            </div>
          </div>
          <div className="info-item">
            <Hash size={18} className="icon" />
            <div>
              <label>Registration No.</label>
              <p>{result.regNo}</p>
            </div>
          </div>
          <div className="info-item">
            <FileText size={18} className="icon" />
            <div>
              <label>Examination</label>
              <p>{result.exam}</p>
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="table-container">
          <table className="grade-table">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Letter Grade</th>
                <th>Result Status</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((sub, i) => (
                <tr key={i} className={sub.result === "FAIL" ? "row-fail" : ""}>
                  <td>{sub.code}</td>
                  <td className="grade-weight">{sub.grade}</td>
                  <td>
                    <span className={`status-tag ${sub.result.toLowerCase()}`}>
                      {sub.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GPA Summary */}
        <div className="footer-summary">
          <div className="gpa-display">
            <span>Cumulative GPA</span>
            <h2>{result.gpa}</h2>
          </div>

          <div className="action-group">
            <button className="btn-download" onClick={() => window.print()}>
              <Download size={18} /> Download Marksheet
            </button>

            {hasBacklog && (
              <button className="btn-backlog" onClick={() => navigate("/backlog-payment", { state: result })}>
                <CreditCard size={18} /> Register Backlog & Pay
              </button>
            )}
          </div>
        </div>
      </div>
      
      <p className="disclaimer">
        * This is a computer-generated document. For official purposes, please collect the original marksheet from the university office.
      </p>
    </div>
  );
};

export default ResultDetail;