const path = require('path');
const readCsvFileAsync = require('./file-operations/read-csv.js');
const getBooksFromGoogleApi = require('./http-operations/get-books-from-google-api.js');

async function main() {
  const filePath = path.join(__dirname, 'books.csv');
  const booksJson = await readCsvFileAsync(filePath);
  const refilledBooks = await getBooksFromGoogleApi(booksJson);
  // for (let i = 0; i <= result.length; i++) {
  //   console.log(result[i]);
  // }
}

main();