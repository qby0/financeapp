import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { database } from '../firebase';
import { ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import './QrScanner.css';

function QrScanner({ onCancel }) {
  const [scannedCode, setScannedCode] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Включаем или выключаем сканер в зависимости от состояния камеры
  useEffect(() => {
    let scanner;

    if (isCameraActive) {
      scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });

      scanner.render(
        (decodedText) => {
          console.log(`QR Code scanned: ${decodedText}`);
          setScannedCode(decodedText);
          setIsCameraActive(false); // Отключаем камеру после успешного сканирования
        },
        (error) => {
          console.warn(`QR Code scan error: ${error}`);
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch((error) => {
          console.error('Failed to clear scanner.', error);
        });
      }
    };
  }, [isCameraActive]);

  const fetchPurchaseInfo = async () => {
    if (!scannedCode) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/fetch-purchase-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCodeData: scannedCode }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setPurchaseInfo(data.data);
        const purchaseId = data.data.id
        if (currentUser) {
          const userId = currentUser.uid;
          const costRef = ref(database, `users/${userId}/purchases/${purchaseId}`);

          try {
              await set(costRef, data.data);
              console.log('Data saved to Realtime Database');
          } catch (error) {
              console.error('Error saving data to Realtime Database:', error);
          }
        } else {
            console.error('User is not authenticated.');
        }
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
    setIsCameraActive(true); // Перезапуск камеры
    setPurchaseInfo(null);
  };

  const handleStartScanning = () => {
    setScannedCode(null);
    setPurchaseInfo(null);
    setIsCameraActive(true);
  };

  return (
    <div className="qr-scanner">
      {!isCameraActive && !purchaseInfo && (
        <button onClick={handleStartScanning}>Start Scanner</button>
      )}

      {isCameraActive && (
        <div>
          <h3>Scan your QR Code</h3>
          <div id="reader" style={{ width: '500px' }}></div>
        </div>
      )}

      {scannedCode && (
        <div>
          <h3>QR Code Scanned</h3>
          <p>{scannedCode}</p>
          <button onClick={fetchPurchaseInfo} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Info'}
          </button>
          <button onClick={handleRescan}>Rescan</button>
        </div>
      )}

      {purchaseInfo && (
        <div>
        </div>
      )}
    </div>
  );
}

export default QrScanner;
