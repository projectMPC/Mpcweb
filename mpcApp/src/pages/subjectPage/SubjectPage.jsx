import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Code,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import "./subjectPage.css";

const Subjects = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const regNo = localStorage.getItem("regNo") || "21BCE0001";
    const API = import.meta.env.VITE_API_URL;

    fetch(`${API}/api/subjects/${regNo}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch subjects");
        }
        return res.json();
      })
      .then((result) => setData(result))
      .catch((err) => {
        console.error("Error fetching subjects:", err);
        setData({ subjects: [], branch: "N/A" }); // fallback to prevent crash
      });
  }, []);

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Syncing your curriculum...</p>
      </div>
    );
  }

  return (
    <div className="subjects-page-container">
      {/* Left Section */}
      <section className="info-section">
        <button className="back-link" onClick={() => navigate("/home")}>
          <ArrowLeft size={16} /> Back to Home
        </button>

        <span className="services-badge">Curriculum</span>

        <h1>Explore your academic modules</h1>

        <p>
          Focused on your <strong>{data.branch}</strong> track, our curriculum
          delivers deep technical knowledge and cutting-edge lab strategies
          to ensure academic excellence.
        </p>

        <button
          className="get-started-btn"
          onClick={() => navigate("/home")}
        >
          Get Started <ArrowRight size={18} />
        </button>
      </section>

      {/* Right Section */}
      <section className="grid-section">
        {data.subjects?.map((sub, i) => (
          <div
            key={i}
            className={`feature-card ${i === 0 ? "blue-active" : ""}`}
            onClick={() => alert(`Opening ${sub.name}`)}
          >
            <div className="icon-circle">
              {sub.name.toLowerCase().includes("lab") ? (
                <Code size={20} />
              ) : (
                <BookOpen size={20} />
              )}
            </div>

            <div className="card-content">
              <span className="card-subtext">{sub.code}</span>
              <h3>{sub.name}</h3>
              <p>
                Access study materials, previous papers, and lab manuals for
                this module.
              </p>

              <div className="card-footer-icon">
                <ChevronRight size={18} />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Subjects;