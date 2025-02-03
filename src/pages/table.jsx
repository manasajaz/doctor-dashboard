import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidepannel from "../components/side-pannel";

function Table() {
  const [tableData, setTableData] = useState([]);

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

  const generatePatientReport = async (patient) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Clinic Name", 105, 15, null, null, "center"); // Clinic Name
    doc.setFontSize(12);
    doc.text(
      `Patient Report - ${new Date().toLocaleDateString()}`,
      105,
      22,
      null,
      null,
      "center"
    ); // Date

    let startY = 30; // Initial Y position for content

    // Add Patient Image if available
    if (patient.profileImage) {
      try {
        const imageUrl = `http://localhost:4600${patient.profileImage}`;
        const imageData = await getBase64Image(imageUrl);
        doc.addImage(imageData, "JPEG", 80, startY, 50, 50); // Positioned at center
        startY += 60; // Move content down
      } catch (error) {
        console.error("Error loading image:", error);
      }
    }

    // Patient Information Table
    doc.autoTable({
      startY: startY + 10,
      head: [["Info", "Details"]],
      body: [
        ["Name", patient.name],
        ["Phone Number", patient.phoneNumber],
        ["Blood Type", patient.blood],
      ],
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] }, // Custom color for headers
      styles: { fontSize: 12, cellPadding: 5 },
    });

    // Footer
    doc.setFontSize(10);
    doc.text(
      "© 2025 Clinic Name | Confidential Report",
      105,
      doc.internal.pageSize.height - 10,
      null,
      null,
      "center"
    );

    // Save PDF
    doc.save(`Patient_Report_${patient.name}.pdf`);
  };

  // Convert Image URL to Base64
  const getBase64Image = (url, maxWidth = 100, maxHeight = 100) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; 
      img.src = url;
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        let width = img.width;
        let height = img.height;
  
        // Maintain aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;
          if (width > height) {
            width = maxWidth;
            height = maxWidth / aspectRatio;
          } else {
            height = maxHeight;
            width = maxHeight * aspectRatio;
          }
        }
  
        // Set high-resolution canvas
        canvas.width = width * 2; // Double resolution for better quality
        canvas.height = height * 2;
        ctx.scale(2, 2); // Scale for high-quality rendering
  
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, 0, 0, width, height);
  
        resolve(canvas.toDataURL("image/jpeg", 1.0)); // Keep quality at 100%
      };
  
      img.onerror = reject;
    });
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
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                          >
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
                            <td className="py-3 px-6 text-center">
                              <button
                                onClick={() => generatePatientReport(patient)}
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                              >
                                Generate Report
                              </button>
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
