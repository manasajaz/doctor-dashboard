import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Card from "../pages/card";
import Home from "../pages/home";
import Form from "../pages/form";
import PatientForm from "../pages/patient-form";
import Table from "../pages/table";
import PatientDetail from "../pages/PatientDetail"
import DoctorDetail from "../pages/doctordetail";
import Register from "../pages/register";
import Login from "../pages/login";
import Profile from "../pages/Profile";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="card" element={<Card />} />
          <Route path="/doctor/:id" element={<DoctorDetail />} />
          <Route path="form" element={<Form />} />
          <Route path="patient-form" element={<PatientForm />} />
          <Route path="table" element={<Table />} />
          <Route path="/patient-detail/:id" element={<PatientDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}
