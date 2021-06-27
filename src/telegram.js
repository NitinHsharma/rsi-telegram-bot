const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    bot.sendMessage(chatId, 'We are under development...');
});

const sendMsg = (text) => {
    try {
        bot.sendMessage('@rsi_indices_channel', text);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMsg;