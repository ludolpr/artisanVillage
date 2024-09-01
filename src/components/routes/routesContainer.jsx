import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import Footer from "../globals/Footer";
import Header from "../globals/Header";
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";
import Dashboard from "../../pages/admin/Dashboard";
import NotFound from "../globals/NotFound";
import ProtectedRoute from "../globals/ProtectedRoute";

const RouteContainer = () => {
  return (
    <Router>
      <Header />
      <div className="root ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute element={<Dashboard />} roleRequired={2} />
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default RouteContainer;
