const cron = require('node-cron');
const getAllRSI = require('./rsi');
const sendMsg = require('./telegram');

cron.schedule('30 10 * * 1-5', () => {  // At 10:30, Monday through Friday
    dowork()
});

cron.schedule('30 16 * * 1-5', () => {  // At 16:30, Monday through Friday
    dowork()
});

const dowork = ()=> {
    try {
        console.log('Running');
        getAllRSI().then(res => {
            const data = `Today ${new Date().toLocaleString('en-IN')} ${res}`;
            sendMsg(data);
        });
    } catch (error) {
        console.log(error);
    }
}