const path = require('path');
const readCsvFileAsync = require('./file-operations/read-csv.js');
const writeCsvFileSync = require('./file-operations/write-csv.js');
const getBooksFromGoogleApi = require('./http-operations/get-books-from-google-api.js');
const getBookPriceFromIdefix = require('./scraping-operations/idefix-scraper.js');

async function main() {
  const argv = require('minimist')(process.argv.slice(2));
  const { start, end } = argv;
  const filePath = path.join(__dirname, 'books.csv');
  const booksJson = await readCsvFileAsync(filePath, start, end);
  const booksFromGoogleApi = await getBooksFromGoogleApi(booksJson);
  const booksWithPrice = await getBookPriceFromIdefix(booksFromGoogleApi);
  await writeCsvFileSync(booksWithPrice);
}

main();