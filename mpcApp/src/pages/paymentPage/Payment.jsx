import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CreditCard,
  XCircle,
  AlertCircle,
} from "lucide-react";
import "./payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fee = location.state;

  // ❌ No data fallback
  if (!fee) {
    return (
      <div className="payment-container">
        <div className="payment-card error-state">
          <AlertCircle size={48} color="#ef4444" />
          <h2>No payment data found</h2>
          <button
            className="cancel-btn"
            onClick={() => navigate("/home")}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);

    try {
      const API = import.meta.env.VITE_API_URL;

      const res = await fetch(
        `${API}/api/fees/pay/${fee._id}`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) {
        throw new Error("Payment failed");
      }

      // ✅ Navigate with updated data
      navigate("/receipt", {
        state: {
          ...fee,
          status: "Paid",
          paidDate: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment Failed ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        {/* Header */}
        <div className="payment-header">
          <div className="icon-box">
            <CreditCard size={28} />
          </div>
          <h1>Secure Checkout</h1>
          <p>Review your semester fees before proceeding</p>
        </div>

        {/* Summary */}
        <div className="billing-summary">
          <div className="summary-row">
            <span>Semester</span>
            <span>{fee.semester}</span>
          </div>

          <div className="summary-row">
            <span>Registration No.</span>
            <span>{fee.regNo || localStorage.getItem("regNo")}</span>
          </div>

          <div className="summary-row">
            <span>Base Fee</span>
            <span>₹{(fee.amount || 0) - (fee.fine || 0)}</span>
          </div>

          <div className="summary-row fine">
            <span>Late Fine</span>
            <span>+ ₹{fee.fine || 0}</span>
          </div>

          <div className="total-divider"></div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{fee.amount}</span>
          </div>
        </div>

        {/* Security */}
        <div className="security-tag">
          <ShieldCheck size={16} />
          <span>Encrypted Secure Payment</span>
        </div>

        {/* Actions */}
        <div className="payment-actions">
          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${fee.amount}`}
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate("/home")}
          >
            <XCircle size={16} /> Cancel Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;