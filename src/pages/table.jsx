

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidepannel from "../components/side-pannel";

function Table() {
  const [tableData, setTableData] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null); // Store selected patient for editing
  const [editFormData, setEditFormData] = useState({}); // Store form data

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4600/api/auth/patient-card"
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);

  // 🗑 Delete Patient
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?"))
      return;

    try {
      await axios.delete(`http://localhost:4600/api/auth/patient-card/${id}`);
      setTableData(tableData.filter((patient) => patient._id !== id)); // Remove from UI
      alert("Patient deleted successfully!");
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };

  // ✏️ Edit Patient
  const handleEdit = (patient) => {
    setEditingPatient(patient._id); // Set the ID of the patient being edited
    setEditFormData({
      name: patient.name,
      phoneNumber: patient.phoneNumber,
      blood: patient.blood,
    });
  };

  // Handle Input Change in Edit Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Handle Form Submission for Update
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4600/api/auth/patient-card/${id}`,
        editFormData
      );

      if (response.status === 200) {
        alert("Patient updated successfully!");

        // Update table data without reloading
        setTableData((prevData) =>
          prevData.map((patient) =>
            patient._id === id ? { ...patient, ...editFormData } : patient
          )
        );

        setEditingPatient(null); // Close edit form
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container flex-1">
          <Sidepannel />
          <div className="layout-page flex-1">
            <Navbar />
            <div className="content-wrapper">
              <div className="container mx-auto p-6">
                <h4 className="text-2xl font-semibold py-3 mb-4">
                  Patient Records
                </h4>

                <div className="bg-white shadow-md rounded my-6">
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Phone Number</th>
                        <th className="py-3 px-6 text-left">Blood Type</th>
                        <th className="py-3 px-6 text-center">Profile Image</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {tableData.length > 0 ? (
                        tableData.map((patient, index) => (
                          <React.Fragment key={index}>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                              <td className="py-3 px-6 text-left whitespace-nowrap">
                                <span className="font-medium">
                                  {patient.name}
                                </span>
                              </td>
                              <td className="py-3 px-6 text-left">
                                {patient.phoneNumber}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {patient.blood}
                              </td>
                              <td className="py-3 px-6 text-center">
                                {patient.profileImage ? (
                                  <img
                                    src={`http://localhost:4600${patient.profileImage}`}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                ) : (
                                  "No Image"
                                )}
                              </td>
                              <td className="py-3 px-6 text-center flex gap-2 justify-center">
                                <Link
                                  to={`/patient-detail/${patient._id}`}
                                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                >
                                  View
                                </Link>
                                <button
                                  onClick={() => handleEdit(patient)}
                                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(patient._id)}
                                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>

                            {/* Inline Edit Form */}
                            {editingPatient === patient._id && (
                              <tr className="bg-gray-100">
                                <td colSpan="5" className="p-4">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      handleUpdate(patient._id);
                                    }}
                                    className="flex flex-col space-y-2"
                                  >
                                    <input
                                      type="text"
                                      name="name"
                                      value={editFormData.name}
                                      onChange={handleInputChange}
                                      className="border rounded p-2 w-full"
                                      placeholder="Full Name"
                                    />
                                    <input
                                      type="text"
                                      name="phoneNumber"
                                      value={editFormData.phoneNumber}
                                      onChange={handleInputChange}
                                      className="border rounded p-2 w-full"
                                      placeholder="Phone Number"
                                    />
                                    <input
                                      type="text"
                                      name="blood"
                                      value={editFormData.blood}
                                      onChange={handleInputChange}
                                      className="border rounded p-2 w-full"
                                      placeholder="Blood Type"
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditingPatient(null)}
                                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            No Data Available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Table;
