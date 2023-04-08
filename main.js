const path = require('path');
const readCsvFileAsync = require('./file-operations/read-csv.js');
const getBooksFromGoogleApi = require('./http-operations/get-books-from-google-api.js');
const getBookPriceFromIdefix = require('./scraping-operations/idefix-scraper.js');

async function main() {
  const filePath = path.join(__dirname, 'books.csv');
  const booksJson = await readCsvFileAsync(filePath);
  const booksFromGoogleApi = await getBooksFromGoogleApi(booksJson);
  const booksWithPrice = await getBookPriceFromIdefix(booksFromGoogleApi);
}

main();