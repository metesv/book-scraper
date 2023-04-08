const csv = require('csvtojson')

async function readCsvFileAsync(filePath) {
  let jsonArray = await csv({ delimiter: ';' }).fromFile(filePath);
  console.log(jsonArray);
  return jsonArray;
}

module.exports = readCsvFileAsync;