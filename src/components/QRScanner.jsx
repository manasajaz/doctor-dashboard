import React, { useState } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

function QRScanner() {
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState("");

  const handleScan = async (scannedData) => {
    if (!scannedData) return;

    try {
      const response = await axios.post("http://localhost:4600/api/generate-token", { 
        qrData: scannedData 
      });

      setTokenData(response.data);
    } catch (err) {
      setError("Failed to fetch token.");
      console.error(err);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("QR scanning error.");
  };

  return (
    <div>
      <h2>Scan QR Code</h2>
      <QrReader delay={300} onScan={handleScan} onError={handleError} style={{ width: "100%" }} />
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {tokenData && (
        <div>
          <h3>Token Number: {tokenData.token}</h3>
          <p>Date & Time: {tokenData.datetime}</p>
        </div>
      )}
    </div>
  );
}

export default QRScanner;
