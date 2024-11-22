import React, { useState } from 'react';
import { database } from '../firebase';
import { ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const QrUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [purchaseInfo, setPurchaseInfo] = useState(null);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('qrImage', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPurchaseInfo(response.data.data); // Передаем данные в состояние
      const purchaseId = response.data.data.id
        if (currentUser) {
          const userId = currentUser.uid;
          const costRef = ref(database, `users/${userId}/purchases/${purchaseId}`);

          try {
              await set(costRef, response.data.data);
              console.log('Data saved to Realtime Database');
          } catch (error) {
              console.error('Error saving data to Realtime Database:', error);
          }
        } else {
            console.error('User is not authenticated.');
        }
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  return (
    <div>
      <h2>QR Code Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

    </div>
  );
};

export default QrUpload;
