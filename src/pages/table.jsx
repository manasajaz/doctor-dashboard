import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you use Axios for fetching data
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidepannel from "../components/side-pannel";

function Table() {
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState(null); // State for editing

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchpatient = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4600/api/auth/patient-card"
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchpatient();
  }, []); // Empty dependency array to run only once

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:4600/api/auth/patient-card/${id}`);
      setTableData((prevData) => prevData.filter((row) => row._id !== id));
    } catch (error) {
      console.error("Error deleting patient card:", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4600/api/auth/patient-card/${editData._id}`,
        editData
      );
      setTableData((prevData) =>
        prevData.map((row) => (row._id === editData._id ? response.data : row))
      );
      setEditData(null); // Close the edit form
    } catch (error) {
      console.error("Error updating patient data:", error);
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
                  Tables / Data Table
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
                        tableData.map((row, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                          >
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <span className="font-medium">{row.name}</span>
                            </td>
                            <td className="py-3 px-6 text-left">
                              {row.phoneNumber}
                            </td>
                            <td className="py-3 px-6 text-left">{row.blood}</td>
                            <td className="py-3 px-6 text-center">
                              {row.profileImage ? (
                                <img
                                  src={`http://localhost:4600${row.profileImage}`}
                                  alt="Profile"
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                "No Image"
                              )}
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center">
                                <button
                                  onClick={() => setEditData(row)}
                                  className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                >
                                  <i className="bx bx-edit"></i>
                                </button>
                                <button
                                  onClick={() => deletePatient(row._id)}
                                  className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                                >
                                  <i className="bx bx-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
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

                {/* Edit Form */}
                {editData && (
                  <div className="bg-gray-100 p-4 rounded shadow-md">
                    <h4 className="text-xl font-semibold mb-4">Edit Patient</h4>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleEditSubmit();
                      }}
                    >
                      <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2">Phone Number</label>
                        <input
                          type="text"
                          value={editData.phoneNumber}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2">Blood Type</label>
                        <input
                          type="text"
                          value={editData.blood}
                          onChange={(e) =>
                            setEditData({ ...editData, blood: e.target.value })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditData(null)}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                )}
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
