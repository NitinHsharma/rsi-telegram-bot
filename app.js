const http = require('http');
const cron = require('node-cron');
const getAllRSI = require('./src/rsi');
const sendMsg = require('./src/telegram');

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


const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, () => {
  console.log(`Server running at :${port}/`);
});