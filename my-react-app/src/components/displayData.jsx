
// async function DisplayData() {
//   const response = fetch('http://localhost:3000/api/coral-info');
//   // console.log('RESPONSE', response);
//   return (
//     <div>
//       {/* Display data received from ChatGPT */}
//       <h2>ChatGPT Response:</h2>
//       {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
//       {/* Format and display data as needed */}
//     </div>
//   );
// }

// export default DisplayData;

import React, { useEffect, useState } from 'react';

const DisplayData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/coral-info');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      {data ? (
        // Render your data here
        <p>{JSON.stringify(data.message.content)}</p>
      ) : (
        // Render loading state or error message
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DisplayData;


