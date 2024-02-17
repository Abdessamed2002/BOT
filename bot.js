const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const TelegramBot = require("node-telegram-bot-api");
const fs = require('fs');

const botToken = "6849664260:AAHAZOLoZpJVAcjPqwH31sXeQVG8k_ZEIGw";
const bot = new TelegramBot(botToken, { polling: true });

const trackedUsers = [];  // Array to store user IDs
bot.onText(/\/start/, (msg) => { // Start command handler
  const chatId = msg.chat.id; // Refers to the unique identifier of the chat conversation you are responding to. 
  // Reply directly to the user who sent the message or Send messages to the entire group or channel
  const userId = msg.from.id; // Represents the unique identifier of the user who sent the message you are currently processing.
  // Send a personal message to the user: for private responses or follow-up actions. Store user-specific information
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
const imagePath = "C:\\Users\\moula\\Pictures\\Back and For Ground\\Welcome_Homes_Logo.jpg"; // Define the path to an image
const caption = "Welcome to Dodie bot."; // add caption
// Function to send an image
function sendImage(userId) {
    // Create a readable stream from the image file
    const imageStream = fs.createReadStream(imagePath);
    // Send the photo to the user with the provided caption
    bot.sendPhoto(userId, imageStream, { caption: caption })
        .then(() => console.log('Image sent successfully'))
        .catch((error) => console.error('Error sending image:', error));
}

bot.startPolling();



const app = express();

app.use(bodyParser.json()); // use to parse the body data based on the JSON format and converts it into a JavaScript object
app.use(cors({ origin: 'http://localhost' })); // front-end origin
app.post('/test', async (req, res) => {
    if(req.body.task === "") {
      return res.status(400).json({ message: "Error : you're task is empty" });
    }
    if(!req || !req.body || !req.body.task) {
      return res.status(400).json({ message: "No task to send" });
    }
    const newTask = req.body.task;
    // const userIds = ["2055334981"];
    // const userIds = ["2055334981", "1121720644", "757140640"];
    //                   me            hacene        reda
    for (const userId of trackedUsers) {
      await bot.sendMessage(userId, newTask);
    }
});
app.listen(3000, () => console.log("Server listening on port 3000"));





// WELCOME TO COMENTS BABY
/*
// hacene helps bot show inputs with bodyParser
const { name, email, password } = req.body;
// Do some validation on the data
if (!name || !email || !password) {
  return res.status(400).json({ error: 'Missing required fields' });
}
console.log(name);
console.log(email);
console.log(password);   
*/





/* the simple bot
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const TelegramBot = require("node-telegram-bot-api");

const botToken = "6849664260:AAHAZOLoZpJVAcjPqwH31sXeQVG8k_ZEIGw";
const bot = new TelegramBot(botToken);
const app = express();

app.use(bodyParser.json()); // use to parse the body data based on the JSON format and converts it into a JavaScript object
app.use(cors({ origin: 'http://localhost' })); // front-end origin
app.post('/test', async (req, res) => {
    if(req.body.task === "") {
      return res.status(400).json({ message: "Error : you're task is empty" });
    }
    if(!req || !req.body || !req.body.task) {
      return res.status(400).json({ message: "No task to send" });
    }
    const newTask = req.body.task;
    const userIds = ["2055334981", "1121720644"];
    for (const userId of userIds) {
      await bot.sendMessage(userId, newTask);
    }
});
app.listen(3000, () => console.log("Server listening on port 3000"));


// WELCOME TO COMENTS BABY
/*
// hacene helps bot show inputs with bodyParser
const { name, email, password } = req.body;
// Do some validation on the data
if (!name || !email || !password) {
  return res.status(400).json({ error: 'Missing required fields' });
}
console.log(name);
console.log(email);
console.log(password);   
*/