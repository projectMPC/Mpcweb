import React, { useState, useEffect } from "react";
import "./homePage.css";
import logo from "../../assets/logo.png"; // Your university logo
import studentPhoto from "../../assets/student-pfp.jpg";
import universityBanner from "../../assets/uni-banner.jpg"; // Add a banner image
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const regNo = localStorage.getItem("regNo");
    if (!regNo) return;

    fetch(`https://mpcweb-5186.onrender.com/api/user/${regNo}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.log("Fetch Error:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("regNo");
    navigate("/");
  };

  if (!formData) return <div className="loading">Loading profile...</div>;

  return (
    <div className="dashboard-container">
      {/* Top Professional Banner */}
      <header className="uni-header">
        <div className="header-brand">
          <img src={logo} alt="University Logo" className="header-logo" />
          <div className="header-text">
            <h1>VELLORE INSTITUTE OF TECHNOLOGY</h1>
          </div>
        </div>
        <img src={universityBanner} alt="Campus" className="header-banner-img" />
      </header>

      <div className="main-layout">
        {/* Sidebar */}
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
              <div className="mini-avatar">👤</div>
              <span>Profile</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="content-area">
          <h2 className="welcome-msg">Welcome, {formData.firstName}</h2>
          
          <div className="profile-grid">
            {/* Left Card: Quick Profile */}
            <div className="profile-card">
              <div className="avatar-container">
                <img src={studentPhoto} alt="student" className="main-avatar" />
              </div>
              <h3>{formData.firstName} {formData.lastName}</h3>
              <p className="branch-text">{formData.branch}</p>

              <div className="tab-buttons">
                <button 
                  className={activeTab === "personal" ? "tab active" : "tab"} 
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Info
                </button>
                <button 
                  className={activeTab === "login" ? "tab" : "tab active"} 
                  onClick={() => setActiveTab("login")}
                >
                  Login & Password
                </button>
                <button className="tab logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            </div>

            {/* Right Card: Details Form */}
            <div className="details-card">
              {activeTab === "personal" ? (
                <>
                  <h3>Personal Information</h3>
                  <div className="form-grid">
                    <div className="input-group"><input name="firstName" value={formData.firstName} onChange={handleChange} /></div>
                    <div className="input-group"><input name="lastName" value={formData.lastName} onChange={handleChange} /></div>
                    <div className="input-group"><input name="email" value={formData.email} onChange={handleChange} /></div>
                    <div className="input-group"><input name="regNo" value={formData.regNo} readOnly /></div>
                    <div className="input-group"><input name="branch" value={formData.branch} onChange={handleChange} /></div>
                    <div className="input-group"><input name="year" value={formData.year} onChange={handleChange} /></div>
                    <div className="input-group location-full"><input name="location" value={formData.location} onChange={handleChange} /></div>
                  </div>
                </>
              ) : (
                <>
                  <h3>Login & Password</h3>
                  <div className="form-grid">
                    <input className="full-width" placeholder="Current Password" type="password" />
                    <input className="full-width" placeholder="New Password" type="password" />
                    <input className="full-width" placeholder="Confirm Password" type="password" />
                  </div>
                </>
              )}
              
              <div className="form-actions">
                <button className="btn-cancel" onClick={() => window.location.reload()}>Cancel</button>
                <button className="btn-save">Save</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;