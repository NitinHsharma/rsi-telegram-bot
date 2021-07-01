const http = require('http');
const cron = require('node-cron');
const getAllRSI = require('./src/rsi');
const sendMsg = require('./src/telegram');
const indices = require('./src/indices');

cron.schedule('0 10 * * 1-5', () => {  // At 10:00, Monday through Friday
    dowork()
}, { timezone : "Asia/Kolkata" } );

const dowork = ()=> {
    try {
        console.log('Running');
        getAllRSI(indices).then(res => {
            const data = `Today ${new Date().toLocaleString('en-IN')} \n ${res}`;
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
