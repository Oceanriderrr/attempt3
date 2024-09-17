import React, { useState } from 'react';
import DataInput from './components/dataInput';
import DisplayData from './components/displayData';
import ImageUploader from './components/imageUploader';

import './App.css'

function App() {
  const [chatGPTResponse, setChatGPTResponse] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [coralInfo, setCoralInfo] = useState(null)


  // const handleChatGPTResponse = (data) => {
  //   setChatGPTResponse(data);
  // };

  const handleImageUpload = async (base64String) => {
    setBase64Image(base64String);

    try {
      // Make a request to your defineCoral server
      const response = await fetch('http://localhost:3000/api/coral-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: base64String,
      });

      if (!response.ok) {
        throw new Error('Failed to get coral information');
      }

      const data = await response.json();
      setCoralInfo(data.message.content);
    } catch (error) {
      console.error('Error fetching coral information:', error);
    }
  };

  return (
    <div>
      <h1>Coral Species Recognition</h1>
      <h4>Image Uploader</h4>
      <ImageUploader onUpload={handleImageUpload} />
      {base64Image && (
        <div>
          <h2>Coral Image:</h2>
          <img src={base64Image} alt="Uploaded" style={{ maxWidth: '50%', borderRadius: '10%' }} />
        </div>
      )}
      {coralInfo && (
        <div>
          <h2>Coral Information:</h2>
          <div>{JSON.stringify(coralInfo, null, 2)}</div>
        </div>
      )}
      {/* <DataInput onChatGPTResponse={handleChatGPTResponse} /> */}
      {/* <DisplayData /> */}
      {/* {chatGPTResponse && <DisplayData chatGPTData={chatGPTResponse} />} */}
    </div>
  );
}

export default App;