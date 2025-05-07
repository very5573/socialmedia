import React, { useState } from 'react';
import axios from 'axios';
import '../styles/pages/create.css'; // Make sure this file exists or copy reels.css content here if needed

export default function Create() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const ext = selectedFile.type.split('/')[0];
      setFileType(ext);
      console.log("File selected: ", selectedFile);
      console.log("File type detected: ", ext);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('No file selected.');
      return;
    }

    if (!fileType) {
      setMessage('Could not detect file type.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const uploadUrl =
      fileType === 'video'
        ? 'http://localhost:5000/upload/video'
        : 'http://localhost:5000/upload/image';

    try {
      const res = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage('File upload failed.');
      }
      setFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('File upload failed.');
    }
  };

  return (
    <div className="create-page">
      <div className="upload-section">
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <button onClick={handleFileUpload} className="upload-btn">
          Upload
        </button>
        {message && <p className="upload-message">{message}</p>}
      </div>
    </div>
  );
}
