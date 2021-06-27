const scraper = require('table-scraper');
const indices = require('./indices');

const url = 'http://www.traderscockpit.com/?pageView=rsi-indicator-rsi-chart&type=rsi&symbol=';

async function getAllRSI() {
    let msg = '';
    for (let index = 0; index < indices.length; index++) {
        const item = indices[index];
        const { name, code } = item;
        const tableData = await scraper.get(url + code);
        const todaysRSI = tableData[3][0].RSI;
        msg += `\n ${name} ${todaysRSI}`;
    }
    return msg;
}
module.exports = getAllRSI;