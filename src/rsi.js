const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://trendlyne.com/equity/technical-analysis/';

async function getAllRSI(requestArray) {
    let msg = '';
    for (let index = 0; index < requestArray.length; index++) {
        const item = requestArray[index];
        const { name, code } = item;
        const response = await axios.get(url + code);
        const $ = cheerio.load(response.data);
        const todaysRSI = $('.tl-dataTable > tbody > tr:nth-child(2) > td:nth-child(2)').html().trim();
        if (msg) msg += '\n';
        msg += `${name} is ${todaysRSI}`;
    }
    return msg;
}

module.exports = getAllRSI;
