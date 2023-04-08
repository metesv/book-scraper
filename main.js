const path = require('path');
const readCsvFileAsync = require('./file-operations/read-csv.js');

async function main() {
  const filePath = path.join(__dirname, 'books.csv');
  console.log(filePath);
  const result = await readCsvFileAsync(filePath);
  console.log(result);
}

main();