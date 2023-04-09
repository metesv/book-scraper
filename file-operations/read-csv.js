const csv = require('csvtojson')

async function readCsvFileAsync(filePath, start, end) {
  let jsonArray = await csv({ delimiter: ';', ignoreEmpty: true }).fromFile(filePath);
  start -= 1;
  return end > start
    ? jsonArray.splice(start, end - start)
    : jsonArray;
}

module.exports = readCsvFileAsync;