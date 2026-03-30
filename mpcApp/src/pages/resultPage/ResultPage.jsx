import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import "./resultPage.css";

const Result = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const regNo = localStorage.getItem("regNo") || "21BCE0001";

    const API = import.meta.env.VITE_API_URL;

    fetch(`${API}/api/result/${regNo}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch results");
        }
        return res.json();
      })
      .then((data) => {
        setResults(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching results:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Fetching your academic records...</p>
      </div>
    );
  }

  return (
    <div className="result-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate("/home")}>
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>

        <div className="title-section">
          <GraduationCap size={32} color="#3b82f6" />
          <h1>Academic Performance</h1>
        </div>
        <p>Manage and view your semester-wise grades</p>
      </header>

      <div className="results-grid">
        {results.map((result, i) => {
          const hasBacklog = result.subjects?.some(
            (s) => s.result === "FAIL"
          );

          return (
            <div
              className={`result-card ${
                hasBacklog ? "border-fail" : "border-pass"
              }`}
              key={i}
            >
              <div className="card-header">
                <div>
                  <h2>{result.exam}</h2>
                  <span className="branch-tag">{result.branch}</span>
                </div>
                <div className="gpa-box">
                  <span className="gpa-label">GPA</span>
                  <span className="gpa-value">{result.gpa}</span>
                </div>
              </div>

              <div className="student-meta">
                <span>
                  <strong>Reg No:</strong> {result.regNo}
                </span>
                <span>
                  <strong>Name:</strong> {result.name}
                </span>
              </div>

              <div className="table-wrapper">
                <table className="result-table">
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Grade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.subjects?.map((sub, index) => (
                      <tr key={index}>
                        <td>{sub.code}</td>
                        <td className="grade-cell">{sub.grade}</td>
                        <td>
                          <span
                            className={`status-pill ${sub.result.toLowerCase()}`}
                          >
                            {sub.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="card-footer">
                <div
                  className={`summary-badge ${
                    hasBacklog ? "fail" : "pass"
                  }`}
                >
                  {hasBacklog ? (
                    <>
                      <AlertTriangle size={16} /> Backlog Present
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} /> Semester Cleared
                    </>
                  )}
                </div>

                <button
                  className="view-detail-btn"
                  onClick={() =>
                    navigate("/result-detail", { state: result })
                  }
                >
                  Detailed View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Result;