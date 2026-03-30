import React, { useEffect, useState } from "react";
import "./feesPage.css";
import { useNavigate } from "react-router-dom";

const Fees = () => {
  const navigate = useNavigate();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const regNo = localStorage.getItem("regNo");
    const API = import.meta.env.VITE_API_URL;

    if (!regNo) {
      console.log("No regNo found");
      setLoading(false);
      return;
    }

    fetch(`${API}/api/fees/${regNo}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch fees");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fees Data:", data);
        setFees(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching fees:", err);
        setFees([]);
        setLoading(false);
      });
  }, []);

  // ✅ Prevent crash if empty
  const paidFees = fees.filter((f) => f.status === "Paid");
  const pendingFees = fees.filter((f) => f.status === "Pending");

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="fees-page">
        <h1>Fees Dashboard</h1>
        <p className="subtitle">Loading your fee details...</p>
      </div>
    );
  }

  return (
    <div className="fees-page">
      <h1>Fees Dashboard</h1>
      <p className="subtitle">Track your payments and dues</p>

      <div className="fees-grid">
        {/* ✅ PAID */}
        {paidFees.map((fee) => (
          <div key={fee._id} className="fee-card paid">
            <span className="badge success">Paid</span>
            <h2>{fee.semester}</h2>
            <h3>₹{fee.amount}</h3>
            <p>
              Paid on:{" "}
              {fee.paidDate
                ? new Date(fee.paidDate).toLocaleDateString()
                : "N/A"}
            </p>

            <button
              className="btn dark"
              onClick={() => navigate("/receipt", { state: fee })}
            >
              View Receipt
            </button>
          </div>
        ))}

        {/* ✅ PENDING */}
        {pendingFees.map((fee) => (
          <div key={fee._id} className="fee-card pending">
            <span className="badge warning">Pending</span>
            <h2>{fee.semester}</h2>
            <h3>₹{fee.amount}</h3>

            <p>
              Due Date:{" "}
              {fee.dueDate
                ? new Date(fee.dueDate).toLocaleDateString()
                : "N/A"}
            </p>

            <p className="fine">Fine: ₹{fee.fine || 0}</p>

            <button
              className="btn pay"
              onClick={() => navigate("/payment", { state: fee })}
            >
              Pay Now
            </button>
          </div>
        ))}

        {/* ✅ STATIC CARD */}
        <div className="fee-card fine-card">
          <span className="badge danger">Fine</span>
          <h2>Late Payment Fee</h2>
          <h3>₹2,000</h3>
          <p>Applied due to delay in fees</p>
          <button className="btn light">Resolve Now</button>
        </div>
      </div>
    </div>
  );
};

export default Fees;