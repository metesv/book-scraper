const csv = require('csvtojson')

async function readCsvFileAsync(filePath) {
  let jsonArray = await csv({ delimiter: ';' }).fromFile(filePath);
  return jsonArray;
}

module.exports = readCsvFileAsync;