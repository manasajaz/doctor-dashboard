import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidepannel from "../components/side-pannel";
import axios from "axios";

function Card() {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctor data from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:4600/api/auth/doctor-card");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array to run only once

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidepannel />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <div className="container mx-auto px-4 py-8">
              <h4 className="text-2xl font-bold mb-6 text-gray-700">Doctors List</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Map over the list of doctors and display each one in a card */}
                {doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <div
                      key={doctor._id}
                      className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        className="w-full h-48 object-cover"
                        src={
                          doctor.profileImage
                            ? `http://localhost:4600${doctor.profileImage}`
                            : "/default-profile.png"
                        }
                        alt={doctor.name}
                      />
                      <div className="p-4">
                        <h5 className="text-lg font-semibold text-gray-800">{doctor.name}</h5>
                        <p className="text-gray-600 mt-2">
                          <strong>Phone:</strong> {doctor.phoneNumber}
                        </p>
                        <p className="text-gray-600 mt-1">
                          <strong>Specialization:</strong>{" "}
                          {Array.isArray(doctor.diseases)
                            ? doctor.diseases.join(", ")
                            : "N/A"}
                        </p>
                        <a
                          href={`/doctor/${doctor._id}`}
                          className="mt-4 block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-lg">No doctors available</p>
                )}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
