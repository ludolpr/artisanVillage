import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Footer from "../globals/Footer";
import Header from "../globals/Header";
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";

const RouteContainer = () => {
  return (
    <Router>
      <Header />
      <div className="root ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default RouteContainer;
