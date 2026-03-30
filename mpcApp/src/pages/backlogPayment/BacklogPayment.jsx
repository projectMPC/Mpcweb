import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, CreditCard, ArrowLeft, ShieldCheck, Info } from "lucide-react";
import "./backlogPayment.css";

const BacklogPayment = () => {
  const { state: result } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!result) return <div className="error-msg">No data found. Please try again.</div>;

  const failedSubjects = result.subjects.filter(s => s.result === "FAIL");
  const feePerSubject = 1000;
  const totalAmount = failedSubjects.length * feePerSubject;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulating a network delay
    setTimeout(() => {
      alert("Backlog Registration Successful! 💳");
      navigate("/receipt", { 
        state: { 
          regNo: result.regNo,
          semester: result.exam,
          amount: totalAmount,
          status: "Paid (Backlog)",
          paidDate: new Date().toLocaleDateString()
        } 
      });
    }, 1500);
  };

  return (
    <div className="backlog-page">
      <div className="backlog-container">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Details
        </button>

        <header className="backlog-header">
          <div className="warning-icon">
            <AlertCircle size={28} />
          </div>
          <h1>Backlog Registration</h1>
          <p>Register your failed subjects for the supplementary examination.</p>
        </header>

        <div className="registration-card">
          <div className="subject-section">
            <h3><Info size={16} /> Subjects to Register</h3>
            <div className="subject-list">
              {failedSubjects.map((s, i) => (
                <div key={i} className="subject-item">
                  <span className="sub-code">{s.code}</span>
                  <span className="sub-fee">₹{feePerSubject}</span>
                </div>
              ))}
            </div>
          </div>

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

          <div className="security-notice">
            <ShieldCheck size={14} />
            <span>Secure Academic Gateway</span>
          </div>

          <button 
            className="pay-now-btn" 
            onClick={handlePayment} 
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : `Confirm & Pay ₹${totalAmount}`}
          </button>
        </div>
        
        <p className="notice-footer">
          Note: Registration is non-refundable. Please ensure subject codes are correct.
        </p>
      </div>
    </div>
  );
};

export default BacklogPayment;