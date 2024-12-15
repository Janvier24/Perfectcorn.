const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const Vonage = require('@vonage/server-sdk');
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

const geoAPIKey = process.env.GEO_API_KEY;

const app = express();
app.use(express.json());

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

// Handle Telegram commands
bot.onText(/\/register/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Please provide your phone number for registration.');
});

bot.onText(/\/deposit/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Please choose your deposit method (MTN or Crypto)');
});

bot.onText(/\/withdraw/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Please enter the amount you wish to withdraw.');
});

// Function to send SMS
function sendSMS(to, text) {
  vonage.message.sendSms(
    'PerfectCorn', // Sender ID
    to,
    text,
    { type: 'text' },
    (err, responseData) => {
      if (err) {
        console.error(err);
      } else {
        console.log('SMS sent successfully:', responseData);
      }
    }
  );
}

// Example usage
sendSMS('250795099930', 'Welcome to PerfectCorn. Your registration is successful!');￼Enter
