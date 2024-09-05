import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import Footer from "../globals/Footer";
import Header from "../globals/Header";
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";
import Dashboard from "../../pages/admin/Dashboard";
import NotFound from "../globals/NotFound";
import Fiche from "../../pages/fiche";
import Products from "../../pages/fiche/Products";
import CreateFicche from "../../pages/fiche/CreateFiche";
import Profil from "../../pages/user/Profil";
import VerifyEmail from "../../pages/user/VerifyEmail";
import Contact from "../../pages/user/Contact";

//proteted route for admin
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
          <Route path="/fiche" element={<Fiche />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="/createfiche" element={<CreateFicche />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/email/verify" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute element={<Dashboard />} roleRequired={3} />
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default RouteContainer;
