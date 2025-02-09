// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Sidepannel from "../components/side-pannel";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";

// function DoctorDetail() {
//   const { id } = useParams(); // Extract doctor ID from the route
//   const [doctor, setDoctor] = useState(null);

//   // Fetch doctor details when the component mounts
//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4600/api/auth/doctor-card/${id}`
//         );
//         setDoctor(response.data);
//       } catch (error) {
//         console.error("Error fetching doctor details:", error);
//       }
//     };

//     fetchDoctor();
//   }, [id]);

//   if (!doctor) {
//     return (
//       <p className="text-center py-8 text-gray-500">
//         Loading doctor details...
//       </p>
//     );
//   }

//   return (
//     <div className="layout-wrapper layout-content-navbar">
//       <div className="layout-container">
//         <Sidepannel />
//         <div className="layout-page">
//           <Navbar />
//           <div className="content-wrapper">
//             <div className="container mx-auto px-4 py-8">
//               <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                 <img
//                   className="w-full h-64 object-cover"
//                   src={
//                     doctor.profileImage
//                       ? `http://localhost:4600${doctor.profileImage}`
//                       : "/default-profile.png"
//                   }
//                   alt={doctor.name}
//                 />
//                 <div className="p-6">
//                   <h2 className="text-2xl font-bold text-gray-800">
//                     {doctor.name}
//                   </h2>
//                   <p className="text-gray-600 mt-2">
//                     <strong>Phone:</strong> {doctor.phoneNumber}
//                   </p>
//                   <p className="text-gray-600 mt-2">
//                     <strong>Specialization:</strong>{" "}
//                     {Array.isArray(doctor.diseases)
//                       ? doctor.diseases.join(", ")
//                       : "N/A"}
//                   </p>
//                   <p className="text-gray-600 mt-2">
//                     <strong>Description:</strong>{" "}
//                     {doctor.description || "No description available."}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <Footer />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidepannel from "../components/side-pannel";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function DoctorDetail() {
  const { id } = useParams(); // Extract doctor ID from the route
  const [doctor, setDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false); // Show/hide appointment form
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    phoneNumber: "",
    specialization: "",
    date: "",
    time: "",
  });

  // Fetch doctor details when the component mounts
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4600/api/auth/doctor-card/${id}`
        );
        setDoctor(response.data);
        setAppointmentData({
          name: response.data.name,
          phoneNumber: response.data.phoneNumber,
          specialization: response.data.diseases
            ? response.data.diseases.join(", ")
            : "N/A",
          date: "",
          time: "",
        });
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  // Handle input change for appointment form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  // Submit Appointment Form
const handleSubmitAppointment = async (e) => {
  e.preventDefault();
  try {
    const updatedDoctorData = {
      ...doctor,
      appointmentDate: appointmentData.date,
      appointmentTime: appointmentData.time,
    };

    const response = await axios.patch(
      `http://localhost:4600/api/auth/doctor-card/${id}`, // Updating the same doctor entry
      updatedDoctorData
    );

    if (response.status === 200) {
      alert("Appointment booked successfully!");
      setShowModal(false); // Close the modal
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert("Failed to book appointment.");
  }
};


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

                  {/* Book Appointment Button */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>

            {/* Appointment Form Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                  {/* Close Button (Top-Left) */}
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg"
                  >
                    ✖
                  </button>

                  <h3 className="text-xl font-semibold mb-4 text-center">
                    Book Appointment
                  </h3>
                  <form onSubmit={handleSubmitAppointment}>
                    <div className="mb-2">
                      <label className="block text-sm font-medium">
                        Doctor Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={appointmentData.name}
                        readOnly
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={appointmentData.phoneNumber}
                        readOnly
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-medium">
                        Specialization
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        value={appointmentData.specialization}
                        readOnly
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-medium">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={appointmentData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-medium">Time</label>
                      <input
                        type="time"
                        name="time"
                        value={appointmentData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
