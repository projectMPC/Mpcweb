import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, CreditCard, XCircle, AlertCircle } from "lucide-react";
import "./payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fee = location.state;

  if (!fee) {
    return (
      <div className="payment-container">
        <div className="payment-card error-state">
          <AlertCircle size={48} color="#ef4444" />
          <h2>No payment data found</h2>
          <button className="cancel-btn" onClick={() => navigate("/fees")}>Go Back</button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/fees/pay/${fee._id}`, {
        method: "PUT",
      });

      if (res.ok) {
        // Pass the fee data to the receipt page so it can display the details
        navigate("/receipt", { state: { ...fee, status: "Paid", paidDate: new Date().toLocaleDateString() } });
      } else {
        alert("Payment Failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <div className="icon-box">
            <CreditCard size={28} />
          </div>
          <h1>Secure Checkout</h1>
          <p>Review your semester fees before proceeding</p>
        </div>

        <div className="billing-summary">
          <div className="summary-row">
            <span>Semester</span>
            <span>{fee.semester}</span>
          </div>
          <div className="summary-row">
            <span>Registration No.</span>
            <span>{fee.regNo || "N/A"}</span>
          </div>
          <div className="summary-row">
            <span>Base Fee</span>
            <span>₹{fee.amount - fee.fine}</span>
          </div>
          <div className="summary-row fine">
            <span>Late Fine</span>
            <span>+ ₹{fee.fine}</span>
          </div>
          <div className="total-divider"></div>
          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{fee.amount}</span>
          </div>
        </div>

        <div className="security-tag">
          <ShieldCheck size={16} />
          <span>Encrypted Secure Payment</span>
        </div>

        <div className="payment-actions">
          <button 
            className="pay-btn" 
            onClick={handlePayment} 
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${fee.amount}`}
          </button>
          
          <button className="cancel-btn" onClick={() => navigate("/fees")}>
            <XCircle size={16} /> Cancel Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;