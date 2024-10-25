import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './QrScanner.css';

function QrScanner({ onCancel }) {
  const [scannedCode, setScannedCode] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isCameraActive && !scannedCode) {
      const scanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: 250 });

      scanner.render(success, error);

      function success(decodedText) {
        console.log(`QR Code scanned: ${decodedText}`);
        setScannedCode(decodedText);
        setIsCameraActive(false);

        fetchPurchaseInfo(decodedText);
      }

      function error(err) {
        console.warn(`QR Code scan error: ${err}`);
      }

      return () => {
        scanner.clear().catch((error) => {
          console.error('Failed to clear scanner.', error);
        });
      };
    }
  }, [isCameraActive, scannedCode]);

  const fetchPurchaseInfo = async (qrCodeData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/fetch-purchase-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCodeData }),
      });

      const data = await response.json();
      if (data.success) {
        setPurchaseInfo(data.data);
      } else {
        alert('Failed to fetch purchase info');
      }
    } catch (error) {
      console.error('Error fetching purchase info:', error);
      alert('Error fetching purchase info');
    } finally {
      setLoading(false);
    }
  };

  const handleRescan = () => {
    setScannedCode(null);
    setIsCameraActive(true);
    setPurchaseInfo(null);
  };

  return (
    <div class ="qr-scanner">
      {!scannedCode ? (
        <div>
          <h3>Scan your QR Code</h3>
          <div id="reader" style={{ width: '500px' }}></div>
        </div>
      ) : loading ? (
        <div>Loading purchase info...</div>
      ) : purchaseInfo ? (
        <div>
          <h3>Purchase Info: {purchaseInfo}</h3>
          <button onClick={handleRescan}>Rescan</button>
          <button onClick={onCancel}>Accept and return</button>
        </div>
      ) : (
        <div>
          <h3>QR Code: {scannedCode}</h3>
          <button onClick={handleRescan}>Rescan</button>
          <button onClick={onCancel}>Accept and return</button>
        </div>
      )}
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default QrScanner;
