const TelegramBot = require('node-telegram-bot-api');
const indices = require('./indices');
const getAllRSI = require('./rsi');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const msgText = msg.text.substr(1);
    if (!msgText) {
        bot.sendMessage(chatId, 'Please select any command by typing /');
        return;
    }
    const row = indices.filter(item => item.command === msgText);
    if (!row.length) {
        bot.sendMessage(chatId, 'Currently we do not support this indices');
        return;
    }
    getAllRSI(row).then(res => {
        const data = `RSI of ${res}`;
        bot.sendMessage(chatId, data);
    }).catch(err => {
        console.log(err);
        bot.sendMessage(chatId, 'Something went wrong, please write to Nitin about this');
    });
});

const sendMsg = (text) => {
    try {
        bot.sendMessage('@rsi_indices_channel', text);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMsg;