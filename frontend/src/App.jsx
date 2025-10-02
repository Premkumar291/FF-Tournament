import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Authentication/Login/loginPage";
import SignupPage from "./Components/Authentication/signup/signupPage";
import ResetPasswordPage from "./Components/Authentication/resetPassword/resetPasswordPage";
import VerifyMailPage from "./Components/Authentication/verifyMail/verifyMailPage";
import DashboardPage from "./Components/Dashboard/dashboardPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyMailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;