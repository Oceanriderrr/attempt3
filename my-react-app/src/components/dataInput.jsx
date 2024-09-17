import React, { useState } from 'react';

function DataInput({ onChatGPTResponse }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      // Prepare data to send to ChatGPT API
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Send image data to ChatGPT's API endpoint
      try {
        const response = await fetch('http://localhost:3000/api/coral-info', {
          method: 'POST',
          body: formData,
          // Add necessary headers like Authorization, content type, etc.
        });

        const data = await response.json();
        // Handle the data received from ChatGPT's API
        console.log('Data from ChatGPT:', data);
        // Pass data to parent component (App.jsx)
        onChatGPTResponse(data);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DataInput;