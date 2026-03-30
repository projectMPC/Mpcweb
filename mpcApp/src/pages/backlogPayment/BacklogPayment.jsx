import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  Info,
} from "lucide-react";
import "./backlogPayment.css";

const BacklogPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const result = location.state;

  // ❌ Handle no data case properly
  if (!result) {
    return (
      <div className="error-msg">
        <h2>No data found ❌</h2>
        <button onClick={() => navigate("/home")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  // ✅ Safe access
  const failedSubjects =
    result.subjects?.filter((s) => s.result === "FAIL") || [];

  const feePerSubject = 1000;
  const totalAmount = failedSubjects.length * feePerSubject;

  const handlePayment = () => {
    if (failedSubjects.length === 0) {
      alert("No backlog subjects to register ✅");
      return;
    }

    setIsProcessing(true);

    // Simulate payment delay
    setTimeout(() => {
      alert("Backlog Registration Successful! 💳");

      navigate("/receipt", {
        state: {
          regNo: result.regNo,
          semester: result.exam,
          amount: totalAmount,
          status: "Paid (Backlog)",
          paidDate: new Date().toISOString(),
        },
      });
    }, 1500);
  };

  return (
    <div className="backlog-page">
      <div className="backlog-container">
        {/* Back Button */}
        <button
          className="back-link"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back to Details
        </button>

        {/* Header */}
        <header className="backlog-header">
          <div className="warning-icon">
            <AlertCircle size={28} />
          </div>
          <h1>Backlog Registration</h1>
          <p>
            Register your failed subjects for the supplementary
            examination.
          </p>
        </header>

        {/* Card */}
        <div className="registration-card">
          {/* Subjects */}
          <div className="subject-section">
            <h3>
              <Info size={16} /> Subjects to Register
            </h3>

            <div className="subject-list">
              {failedSubjects.length > 0 ? (
                failedSubjects.map((s, i) => (
                  <div key={i} className="subject-item">
                    <span className="sub-code">{s.code}</span>
                    <span className="sub-fee">
                      ₹{feePerSubject}
                    </span>
                  </div>
                ))
              ) : (
                <p>No failed subjects 🎉</p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="payment-summary">
            <div className="summary-row">
              <span>Total Subjects</span>
              <span>{failedSubjects.length}</span>
            </div>

            <div className="summary-row">
              <span>Fee per Subject</span>
              <span>₹{feePerSubject}</span>
            </div>

            <div className="total-row">
              <span>Total Payable Amount</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* Security */}
          <div className="security-notice">
            <ShieldCheck size={14} />
            <span>Secure Academic Gateway</span>
          </div>

          {/* Button */}
          <button
            className="pay-now-btn"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing
              ? "Processing..."
              : `Confirm & Pay ₹${totalAmount}`}
          </button>
        </div>

        {/* Footer */}
        <p className="notice-footer">
          Note: Registration is non-refundable. Please ensure
          subject codes are correct.
        </p>
      </div>
    </div>
  );
};

export default BacklogPayment;