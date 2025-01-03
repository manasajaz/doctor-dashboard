import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Card from "../pages/card";
import Home from "../pages/home";
import Form from "../pages/form"
import PatientForm from "../pages/patient-form"
import Table from "../pages/table"






export default function AppRouter() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="card" element={<Card />} />
          <Route path="form" element={<Form />} />
          <Route path="patient-form" element={<PatientForm/>} />
          <Route path="table" element={<Table />} />
        </Routes>
      </Router>
    </>
  );
}
