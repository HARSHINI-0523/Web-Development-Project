import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import AboutUs from "./components/aboutus/AboutUs";
import Services from "./components/services/Services";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/dashboard/Profile";
import Search from "./components/dashboard/Search";
import ArtShowcase from "./components/dashboard/ArtShowcase";
import Create from "./components/dashboard/Create";
import Event from "./components/dashboard/Event";
import Resources from "./components/dashboard/Resources";
import Settings from "./components/dashboard/Settings";
import EditProfile from "./components/dashboard/EditProfile";
import Activity from "./components/dashboard/Activity"; 
import PrivateRoute from "./components/PrivateRoute"; 

const PublicLayout = () => (
    <>
        <Outlet />
    </>
);

const DashboardLayout = () => (
    <PrivateRoute>
        <Dashboard />
    </PrivateRoute>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Header */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Dashboard Routes without Header */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="art-showcase" element={<ArtShowcase />} />
          <Route path="create" element={<Create />} />
          <Route path="events" element={<Event />} />
          <Route path="resources" element={<Resources />} />
          <Route path="settings" element={<Settings />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="activity" element={<Activity />} />
          <Route path="search" element={<Search />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
