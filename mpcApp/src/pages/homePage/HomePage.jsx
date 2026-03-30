import React, { useState } from "react";
import "./homePage.css";
import logo from "../../assets/logo.png";
import studentPhoto from "../../assets/student-pfp.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("personal");

  const [formData, setFormData] = useState({
    firstName: "Sthita",
    lastName: "Pragyan",
    email: "student@vit.ac.in",
    regNo: "21BCE0001",
    branch: "ETC",
    year: "3rd Year",
    location: "India",
  });

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Cancel Reset
  const handleCancel = () => {
    alert("Changes discarded");
    window.location.reload(); // simple reset
  };

  // 🔹 Save
  const handleSave = () => {
    alert("Changes saved (demo)");
  };

  // 🔹 Logout
  const handleLogout = () => {
    alert("Logged out");
    navigate("/");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-box">
          <img src={logo} alt="logo" />
        </div>

        <nav className="nav-menu">
          <span className="active" onClick={() => navigate("/home")}>
            Dashboard
          </span>

          <span onClick={() => navigate("/result")}>Results</span>

          <span onClick={() => navigate("/fees")}>Fees</span>

          <span onClick={() => navigate("/subjects")}>Subjects</span>

          <span onClick={() => alert("Settings page coming soon")}>
            ⚙️ Settings
          </span>
        </nav>

        <div className="profile-mini">
          <img src={studentPhoto} alt="student" />
          <span>Profile</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-area">
        {/* Profile Card */}
        <div className="profile-card">
          <img src={studentPhoto} alt="student" />
          <h3>
            {formData.firstName} {formData.lastName}
          </h3>
          <p>{formData.branch}</p>

          <button
            className={activeTab === "personal" ? "active-tab" : ""}
            onClick={() => setActiveTab("personal")}
          >
            Personal Info
          </button>

          <button
            className={activeTab === "login" ? "active-tab" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login & Password
          </button>

          <button onClick={handleLogout}>Logout</button>
        </div>

        {/* Details Section */}
        <div className="details-card">
          {activeTab === "personal" && (
            <>
              <h2>Personal Information</h2>

              <div className="form-grid">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />

                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <input name="regNo" value={formData.regNo} readOnly />

                <input
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                />

                <input
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="action-buttons">
                <button className="cancel" onClick={handleCancel}>
                  Cancel
                </button>

                <button className="save" onClick={handleSave}>
                  Save
                </button>
              </div>
            </>
          )}

          {/* Login Tab */}
          {activeTab === "login" && (
            <>
              <h2>Login & Password</h2>

              <div className="form-grid">
                <input placeholder="Current Password" type="password" />
                <input placeholder="New Password" type="password" />
                <input placeholder="Confirm Password" type="password" />
              </div>

              <div className="action-buttons">
                <button className="cancel">Cancel</button>
                <button className="save">Update Password</button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;