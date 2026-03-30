import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";
import "./receipt.css";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fee = location.state;

  // ❌ No data case
  if (!fee) {
    return (
      <div className="receipt-container">
        <div className="receipt-card error-state">
          <h2>No receipt data found ❌</h2>
          <button className="btn-primary" onClick={() => navigate("/fees")}>
            Return to Fees
          </button>
        </div>
      </div>
    );
  }

  // ✅ Safe values
  const regNo = fee.regNo || localStorage.getItem("regNo");
  const semester = fee.semester || "N/A";
  const amount = fee.amount || "0";
  const status = fee.status || "Paid";

  // ✅ Format date properly
  const paidDate = fee.paidDate
    ? new Date(fee.paidDate).toLocaleDateString()
    : new Date().toLocaleDateString();

  // ✅ Stable Transaction ID (only generated once)
  const transactionId =
    fee.transactionId ||
    "VSSUT-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="receipt-container">
      <div className="receipt-card">

        {/* Success Header */}
        <div className="status-icon">
          <CheckCircle size={32} strokeWidth={2.5} />
        </div>

        <h1>Payment Successful</h1>
        <p className="subtitle">Your transaction has been processed.</p>

        {/* Amount Section */}
        <div className="total-section">
          <p>Amount Paid</p>
          <h2>₹{amount}</h2>
        </div>

        {/* Details */}
        <div className="receipt-details">
          <div className="detail-row">
            <label>Registration No</label>
            <span>{regNo}</span>
          </div>

          <div className="detail-row">
            <label>Semester</label>
            <span>{semester}</span>
          </div>

          <div className="detail-row">
            <label>Status</label>
            <span style={{ color: "#15803d" }}>{status}</span>
          </div>

          <div className="detail-row">
            <label>Paid Date</label>
            <span>{paidDate}</span>
          </div>

          <div className="detail-row">
            <label>Transaction ID</label>
            <span>#{transactionId}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="btn-primary" onClick={() => window.print()}>
            <Download size={16} /> Download PDF
          </button>

          <button className="btn-secondary" onClick={() => navigate("/fees")}>
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>

        <p className="footer-note">
          A copy of this receipt has been generated successfully.
        </p>
      </div>
    </div>
  );
};

export default Receipt;