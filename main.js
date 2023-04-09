const path = require('path');
const readCsvFileAsync = require('./file-operations/read-csv.js');
const writeCsvFileSync = require('./file-operations/write-csv.js');
const getBooksFromGoogleApi = require('./http-operations/get-books-from-google-api.js');
const makeParallelApiCall = require('./bll/parallel-api-call.js');

async function main() {
  const argv = require('minimist')(process.argv.slice(2));
  const { start, end } = argv;
  const filePath = path.join(__dirname, 'books.csv');
  try {
    const booksJson = await readCsvFileAsync(filePath, start, end);
    const booksFromGoogleApi = await getBooksFromGoogleApi(booksJson);
    const booksWithPrice = await makeParallelApiCall(booksFromGoogleApi);
    await writeCsvFileSync(booksWithPrice);
  } catch (error) {
    console.log(error);
  }
}

main();