import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidepannel from "../components/side-pannel";
import doctor from "../assets/doctor.png"; 
import patient from "../assets/patient.png"; 


function Home() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  // Fetch doctors & patients from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorRes, patientRes] = await Promise.all([
          fetch("http://localhost:4600/api/auth/doctor-card"),
          fetch("http://localhost:4600/api/auth/patient-card"),
        ]);

        const doctorsData = await doctorRes.json();
        const patientsData = await patientRes.json();

        setDoctors(doctorsData); // Show all doctors dynamically
        setPatients(patientsData); // Show all patients dynamically
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Runs once on mount

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidepannel />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                {/* Doctors Count Card */}
                <div className="col-lg-6 col-md-6 col-12 mb-4">
                  <div className="card text-center p-4 shadow-sm">
                    <div className="card-body">
                      <img
                        src={doctor}
                        alt="Doctors"
                        className="mb-3 mx-auto"
                        style={{ width: "50px" }}
                      />
                      <h4 className="card-title">Total Doctors</h4>
                      <h2 className="text-primary">{doctors.length}</h2>
                    </div>
                  </div>
                </div>

                {/* Patients Count Card */}
                <div className="col-lg-6 col-md-6 col-12 mb-4">
                  <div className="card text-center p-4 shadow-sm">
                    <div className="card-body">
                      <img
                        src={patient}
                        alt="Patients"
                        className="mb-3 mx-auto"
                        style={{ width: "50px" }}
                      />
                      <h4 className="card-title">Total Patients</h4>
                      <h2 className="text-success">{patients.length}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
            <div className="content-backdrop fade" />
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle" />
    </div>
  );
}

export default Home;
