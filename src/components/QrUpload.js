import React, { useState } from 'react';
import axios from 'axios';

const QrUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [decodedText, setDecodedText] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('qrImage', selectedFile);

        try {
            console.log('Uploading file...');
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Response received:', response.data);
            setDecodedText(response.data.decodedText);
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    };

    return (
        <div>
            <h2>QR Code Upload</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {decodedText && <p>Decoded Text: {decodedText}</p>}
            {console.log(decodedText)}
        </div>
    );
};

export default QrUpload;
