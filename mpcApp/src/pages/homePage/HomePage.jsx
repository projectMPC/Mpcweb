import React, { useState, useEffect } from "react";
import "./homePage.css";
import logo from "../../assets/logo1.png"; 
import studentPhoto from "../../assets/student-pfp.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const regNo = localStorage.getItem("regNo");
    if (!regNo) {
      navigate("/"); // Redirect if no session
      return;
    }

    fetch(`https://mpcweb-5186.onrender.com/api/user/${regNo}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("regNo");
    navigate("/");
  };

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading MPC Profile...</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* 1. Improved Banner: Using a background-image overlay in CSS for better readability */}
      <header className="uni-header">
        <div className="header-brand">
          <img src={logo} alt="MPC Logo" className="header-logo" />
          <div className="header-text">
            <h1>Maharaja Purna Chandra Autonomous College, Baripada</h1>
            <p>Student Management Portal</p>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <nav className="nav-menu">
            <div className="nav-item active" onClick={() => navigate("/home")}>Dashboard</div>
            <div className="nav-item" onClick={() => navigate("/result")}>Results</div>
            <div className="nav-item" onClick={() => navigate("/fees")}>Fees</div>
            <div className="nav-item" onClick={() => navigate("/subjects")}>Subjects</div>
            <div className="nav-item" onClick={() => alert("Settings coming soon")}>⚙️ Settings</div>
          </nav>
          
          <div className="sidebar-footer">
            <div className="profile-mini">
              <img src={studentPhoto} alt="pfp" className="mini-pfp" />
              <span>{formData.firstName}</span>
            </div>
          </div>
        </aside>

        <main className="content-area">
          <h2 className="welcome-msg">Welcome back, {formData.firstName}!</h2>
          
          <div className="profile-grid">
            <div className="profile-card">
              <div className="avatar-container">
                <img src={studentPhoto} alt="student" className="main-avatar" />
              </div>
              <h3>{formData.firstName} {formData.lastName}</h3>
              <p className="branch-text">{formData.branch}</p>

              <div className="tab-buttons">
                <button 
                  className={`tab ${activeTab === "personal" ? "active" : ""}`} 
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Info
                </button>
                <button 
                  className={`tab ${activeTab === "login" ? "active" : ""}`} 
                  onClick={() => setActiveTab("login")}
                >
                  Login & Password
                </button>
                <button className="tab logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            </div>

            <div className="details-card">
              {activeTab === "personal" ? (
                <section>
                  <h3>Personal Information</h3>
                  <div className="form-grid">
                    <div className="input-group">
                      <label>First Name</label>
                      <input name="firstName" value={formData.firstName || ""} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <label>Last Name</label>
                      <input name="lastName" value={formData.lastName || ""} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <label>Email ID</label>
                      <input name="email" value={formData.email || ""} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <label>Registration No.</label>
                      <input name="regNo" value={formData.regNo || ""} readOnly className="readonly-input" />
                    </div>
                    <div className="input-group">
                      <label>Branch</label>
                      <input name="branch" value={formData.branch || ""} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <label>Academic Year</label>
                      <input name="year" value={formData.year || ""} onChange={handleChange} />
                    </div>
                    <div className="input-group location-full">
                      <label>Location</label>
                      <input name="location" value={formData.location || ""} onChange={handleChange} />
                    </div>
                  </div>
                </section>
              ) : (
                <section>
                  <h3>Login & Security</h3>
                  <p className="hint">Update your portal password below.</p>
                  <div className="form-grid">
                    <input className="full-width" placeholder="Current Password" type="password" />
                    <input className="full-width" placeholder="New Password" type="password" />
                    <input className="full-width" placeholder="Confirm New Password" type="password" />
                  </div>
                </section>
              )}
              
              <div className="form-actions">
                <button className="btn-cancel" onClick={() => window.location.reload()}>Discard Changes</button>
                <button className="btn-save" onClick={() => alert("Updated Successfully!")}>Save Changes</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;