require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const OpenAI = require('openai')
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const { SYSTEM, ASSISTANT } = require('./config');


// Enable CORS for all routes
app.use(cors());

// Use body-parser middleware to parse the request body
app.use(bodyParser.text({ type: 'text/plain', limit: '10mb' }));

// Initialize OpenAI API with your API key
const openai = new OpenAI({ apiKey: '' });

// Define a function to make a request to the OpenAI GPT API
const defineCoral = async (dataUri) => {
  // const imagePath = 'coral.png';
  // const imageBuffer = fs.readFileSync(imagePath);
  // const base64Image = imageBuffer.toString('base64');
  // const dataUri = `data:image/jpeg;base64,${base64Image}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content: SYSTEM
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'What type of coral is this?' },
            {
              type: 'image_url',
              image_url: {
                url: `${dataUri}`
              },
            },
          ],
        },
        {
          role: 'assistant',
          content: ASSISTANT
        },
        {
          role: 'user',
          content: [
            {
              type: 'text', text: 'Can you tell me anything about the coral health by observing the photo and identifying if there is any coral bleaching?'
            }
          ]
        },
      ],
    });
    console.log(response.choices[0]);
    return response.choices[0];
  } catch (error) {
    throw new Error(error)
  }
}


// Define the endpoint and associate it with your function
// app.get('/api/coral-info', defineCoral);

app.get('/api/coral-info', async (req, res) => {
  try {
    // Make an external API request to JSONPlaceholder
    // const response = await defineCoral();
    // console.log('RES', response)
    // The base64 string is now available in req.body
    const base64String = req.body;

    // Your logic to process the base64 string here
    console.log('Received base64 string:', base64String);

    // res.json(response);
    res.json({ message: 'Received base64 string successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/coral-info', async (req, res) => {
  try {
    // The base64 string is now available in req.body
    const base64String = req.body;
    // Make an external API request to JSONPlaceholder
    const response = await defineCoral(base64String);


    res.json(response);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});