const { Configuration, OpenAIApi, OpenAI } = require('openai');
const fs = require('fs');

// let image;
// fs.readFile('./assets/blueRiceCoral.jpeg', (err, data) => {
//   if (err) throw err;
//   image = Buffer.from(data, 'binary').toString('base64');
//   console.log(image);
// });

const imagePath = './assets/blueRiceCoral.jpeg';
const imageBuffer = fs.readFileSync(imagePath);
const base64Image = imageBuffer.toString('base64');

const dataUri = `data:image/jpeg;base64,${base64Image}`;

// "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Coral_Outcrop_Flynn_Reef.jpg/1920px-Coral_Outcrop_Flynn_Reef.jpg"



const openai = new OpenAI({ apiKey: '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' });

async function main() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
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
    ],
  });
  console.log(response.choices[0]);
}
main();
