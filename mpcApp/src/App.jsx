import React from "react";
// You must import these components to use them
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/loginPages/LoginPages";
import Home from "./pages/homePage/HomePage";
import Result from "./pages/resultPage/ResultPage";
import Fees from "./pages/feesPage/FeesPage";
import Subjects from "./pages/subjectPage/SubjectPage";
import Receipt from "./pages/receiptPage/Receipt";
import Payment from "./pages/paymentPage/Payment";
import ResultDetail from "./pages/resultDetail/ResultDetail";
import BacklogPayment from "./pages/backlogPayment/BacklogPayment";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/receipt" element={<Receipt />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/result-detail" element={<ResultDetail />} />
        <Route path="/backlog-payment" element={<BacklogPayment />} />
      </Routes>
    </Router>
  );
};

export default App;
