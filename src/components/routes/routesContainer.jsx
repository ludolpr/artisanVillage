import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import Footer from "../globals/Footer";
import Header from "../globals/Header";
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";
import Dashboard from "../../pages/admin/Dashboard";
import NotFound from "../globals/NotFound";
import Sheet from "../../pages/fiche";
import CreateSheet from "../../pages/fiche/CreateSheet";
import ShowSheet from "../../pages/fiche/ShowSheet";
import ShowSheetOwner from "../../pages/fiche/ShowSheetOwner";
import Products from "../../pages/fiche/Products";
import EditProductOwner from "../../pages/fiche/EditProductOwner";
import Profil from "../../pages/user/Profil";
import VerifyEmail from "../../pages/user/VerifyEmail";
import Contact from "../../pages/user/Contact";

//proteted route for admin
import ProtectedRoute from "../globals/ProtectedRoute";
import MentionsLegales from "../informations/MentionsLegales";
import Policies from "../informations/Policies";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const RouteContainer = () => {
  const swaggerUrl = "http://localhost:8000/api/documentation";
  return (
    <Router>
      <Header />
      <div className="root ">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* auth  */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* sheets */}
          <Route path="/sheet" element={<Sheet />} />
          <Route path="/creerfiche" element={<CreateSheet />} />
          <Route path="/showsheet/:id" element={<ShowSheet />} />
          <Route path="/showsheetowner/:id" element={<ShowSheetOwner />} />
          {/* products */}
          <Route path="/product" component={<Products />} />
          <Route
            path="/editproduct/:productId"
            element={<EditProductOwner />}
          />
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
          {/* mentions and policies */}
          <Route path="/mentions" element={<MentionsLegales />} />
          <Route path="/policy" element={<Policies />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default RouteContainer;
