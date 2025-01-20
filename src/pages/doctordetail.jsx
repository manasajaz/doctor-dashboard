import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidepannel from "../components/side-pannel";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function DoctorDetail() {
  const { id } = useParams(); // Extract doctor ID from the route
  const [doctor, setDoctor] = useState(null);

  // Fetch doctor details when the component mounts
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4600/api/auth/doctor-card/${id}`
        );
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) {
    return (
      <p className="text-center py-8 text-gray-500">
        Loading doctor details...
      </p>
    );
  }

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidepannel />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <div className="container mx-auto px-4 py-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  className="w-full h-64 object-cover"
                  src={
                    doctor.profileImage
                      ? `http://localhost:4600${doctor.profileImage}`
                      : "/default-profile.png"
                  }
                  alt={doctor.name}
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {doctor.name}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    <strong>Phone:</strong> {doctor.phoneNumber}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Specialization:</strong>{" "}
                    {Array.isArray(doctor.diseases)
                      ? doctor.diseases.join(", ")
                      : "N/A"}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Description:</strong>{" "}
                    {doctor.description || "No description available."}
                  </p>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
