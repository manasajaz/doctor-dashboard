import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you use Axios for fetching data
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidepannel from "../components/side-pannel";

function Table() {
  const [tableData, setTableData] = useState([]);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://your-backend-url/api/get-data") // Replace with your backend API URL
      .then((response) => {
        setTableData(response.data); // Assuming data is an array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container flex-1">
          <Sidepannel />
          <div className="layout-page flex-1">
            <Navbar />
            <div className="content-wrapper">
              <div className="container mx-auto p-6">
                <h4 className="text-2xl font-semibold py-3 mb-4">Tables / Data Table</h4>

                <div className="bg-white shadow-md rounded my-6">
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Project</th>
                        <th className="py-3 px-6 text-left">Client</th>
                        <th className="py-3 px-6 text-left">Users</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {tableData.length > 0 ? (
                        tableData.map((row, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="font-medium">{row.project}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <span>{row.client}</span>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <ul className="list-none flex space-x-2">
                                {row.users.map((user, idx) => (
                                  <li key={idx} className="w-8 h-8">
                                    <img
                                      src={user.avatar}
                                      alt={user.name}
                                      className="rounded-full object-cover"
                                    />
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <span
                                className={`py-1 px-3 rounded-full text-xs ${row.status === "Active"
                                  ? "bg-green-200 text-green-600"
                                  : "bg-red-200 text-red-600"
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center">
                                <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <i className="bx bx-edit"></i>
                                </button>
                                <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
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
