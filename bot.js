const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const TelegramBot = require("node-telegram-bot-api");
const fs = require('fs');

const botToken = botToken;
const bot = new TelegramBot(botToken, { polling: true });

const trackedUsers = [];  // Array to store users ID
bot.onText(/\/start/, (msg) => { // Start command handler
  const chatId = msg.chat.id; // identifier of the chat conversation 
  const userId = msg.from.id; // the unique identifier of the user
  const firstName = msg.from.first_name;
  const lastName = msg.from.last_name;
  let welcomeMessage = "Hello ";
  if (lastName) { welcomeMessage += firstName + " " + lastName; } 
  else { welcomeMessage += firstName; }
  bot.sendMessage(chatId, welcomeMessage);
  if (!trackedUsers.includes(userId)) { trackedUsers.push(userId); }
  // Call your sendImage function here
  // sendImage(userId);
});
console.log('Tracked Users:', trackedUsers);

const imagePath = "C:\\Users\\path...\\Welcome_Homes_Logo.jpg"; // Define the path to an image
const caption = "Welcome to Factory bot."; // add caption
// Function to send an image
function sendImage(userId) {
    // Create a readable stream from the image file
    const imageStream = fs.createReadStream(imagePath);
    // Send the photo to the user with the provided caption
    bot.sendPhoto(userId, imageStream, { caption: caption })
        .then(() => console.log('Image sent successfully'))
        .catch((error) => console.error('Error sending image:', error));
}

bot.startPolling(); // to receive msgs from telegram users


const app = express();
app.use(bodyParser.json()); // use to parse the body data based on the JSON format and converts it into a JavaScript object
app.use(cors({ origin: 'http://localhost' })); // front-end origin of ToDoApp
app.post('/test', async (req, res) => {
    if(req.body.task === "") {
      return res.status(400).json({ message: "Error : you're task is empty" });
    }
    if(!req || !req.body || !req.body.task) {
      return res.status(400).json({ message: "No task to send" });
    }
    const newTask = req.body.task;
    for (const userId of trackedUsers) {
      await bot.sendMessage(userId, newTask);
    }
});
app.listen(3000, () => console.log("Server listening on port 3000"));
