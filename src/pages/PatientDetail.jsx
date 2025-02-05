import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { QRCodeCanvas } from "qrcode.react";

function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4600/api/auth/patient-card/${id}`
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatient();
  }, [id]);

  const generatePatientReport = () => {
    if (!patient) return;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Clinic Name", 105, 15, null, null, "center");
    doc.setFontSize(12);
    doc.text(
      `Patient Report - ${new Date().toLocaleDateString()}`,
      105,
      22,
      null,
      null,
      "center"
    );

    doc.autoTable({
      startY: 30,
      head: [["Info", "Details"]],
      body: [
        ["Name", patient?.name],
        ["Phone Number", patient?.phoneNumber],
        ["Blood Type", patient?.blood],
        ["Token Number", `Token-${id}`],
      ],
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 12, cellPadding: 5 },
    });

    doc.text(
      "© 2025 Clinic Name | Confidential Report",
      105,
      doc.internal.pageSize.height - 10,
      null,
      null,
      "center"
    );
    doc.save(`Patient_Report_${patient?.name}.pdf`);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {patient?.name}'s Summary
        </h2>

        <div className="flex items-center justify-center mb-6">
          {patient?.profileImage && (
            <img
              src={`http://localhost:4600${patient?.profileImage}`}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          )}
        </div>

        <div className="mb-6 text-center">
          <p>
            <strong>Phone:</strong> {patient?.phoneNumber}
          </p>
          <p>
            <strong>Blood Type:</strong> {patient?.blood}
          </p>
          <p>
            <strong>Token:</strong> Token-{id}
          </p>
        </div>

        <div className="flex justify-center items-center flex-col">
          <p className="font-semibold">Scan QR for Full Details</p>
          <QRCodeCanvas
            value={`http://localhost:4600/patient-/${id}`}
            size={120}
          />
        </div>

        <button
          onClick={generatePatientReport}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded w-full"
        >
          Generate Report
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-4 px-4 py-2 bg-gray-400 text-white rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default PatientDetail;
