import React, { useState, useEffect } from "react";
import "./homePage.css";
import logo from "../../assets/logo.png";
import studentPhoto from "../../assets/student-pfp.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");

  const [formData, setFormData] = useState(null);

  // 🔥 Fetch user data from MongoDB
  useEffect(() => {
  const regNo = localStorage.getItem("regNo");

  console.log("regNo:", regNo);

  if (!regNo) {
    console.log("No regNo found");
    return;
  }

  fetch(`http://localhost:5000/api/user/${regNo}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }
      return res.json();
    })
    .then((data) => {
      console.log("User Data:", data);

      if (!data || !data.regNo) {
        console.log("Invalid user data");
        return;
      }

      setFormData(data);
    })
    .catch((err) => console.log("Fetch Error:", err));
}, []);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Cancel Reset
  const handleCancel = () => {
    alert("Changes discarded");
    window.location.reload();
  };

  // 🔹 Save (you can later connect backend update)
  const handleSave = () => {
    alert("Changes saved (frontend only)");
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("regNo");
    alert("Logged out");
    navigate("/");
  };

  // ⏳ Loading
  if (!formData) {
    return <h2 style={{ textAlign: "center" }}>Loading profile...</h2>;
  }

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
                  value={formData.firstName || ""}
                  onChange={handleChange}
                />

                <input
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                />

                <input
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />

                <input
                  name="regNo"
                  value={formData.regNo || ""}
                  readOnly
                />

                <input
                  name="branch"
                  value={formData.branch || ""}
                  onChange={handleChange}
                />

                <input
                  name="year"
                  value={formData.year || ""}
                  onChange={handleChange}
                />

                <input
                  name="location"
                  value={formData.location || ""}
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