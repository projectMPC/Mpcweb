import React, { useEffect, useState } from "react";
import "./feesPage.css";
import { useNavigate } from "react-router-dom";

const Fees = () => {
  const navigate = useNavigate();
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const regNo = localStorage.getItem("regNo");

    if (!regNo) {
      console.log("No regNo found");
      return;
    }

    fetch(`http://localhost:5000/api/fees/${regNo}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fees Data:", data);
        setFees(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const paidFees = fees.filter((f) => f.status === "Paid");
  const pendingFees = fees.filter((f) => f.status === "Pending");

  return (
    <div className="fees-page">
      <h1>Fees Dashboard</h1>
      <p className="subtitle">Track your payments and dues</p>

      <div className="fees-grid">
        {/* PAID */}
        {paidFees.map((fee) => (
          <div key={fee._id} className="fee-card paid">
            <span className="badge success">Paid</span>
            <h2>{fee.semester}</h2>
            <h3>₹{fee.amount}</h3>
            <p>Paid on: {fee.paidDate}</p>
            <button
              className="btn dark"
              onClick={() => navigate("/receipt", { state: fee })}
            >
              View Receipt
            </button>
          </div>
        ))}

        {/* PENDING */}
        {pendingFees.map((fee) => (
          <div key={fee._id} className="fee-card pending">
            <span className="badge warning">Pending</span>
            <h2>{fee.semester}</h2>
            <h3>₹{fee.amount}</h3>
            <p>Due Date: {fee.dueDate}</p>
            <p className="fine">Fine: ₹{fee.fine}</p>

            <button
              className="btn pay"
              onClick={() => navigate("/payment", { state: fee })}
            >
              Pay Now
            </button>
          </div>
        ))}

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
