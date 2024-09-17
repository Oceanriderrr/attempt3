import React, { useState } from 'react';

const ImageUploader = ({ onUpload }) => {

  const inputStyle = {
    border: 'none',
    borderBottom: '2px solid #3498db', // Set the color of the squiggly line
    outline: 'none',
    fontSize: '16px',
    padding: '5px',
    position: 'relative',
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        // Use FileReader to read the selected file and convert it to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          onUpload(base64String);
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <input type="file" style={inputStyle} onChange={handleFileChange} />
      <button onClick={handleUpload}>Submit Image </button>
    </div>
  );
};

export default ImageUploader;
