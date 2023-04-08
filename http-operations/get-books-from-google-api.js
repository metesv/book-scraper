const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const _ = require('lodash');
const axios = require('axios');
const cliProgress = require('cli-progress');

async function getBooksFromGoogleApi(books) {
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(books.length, 0);

  for (let i = 0; i < books.length; i++) {
    const bookIdentifier = books[i].isbn13.length > 0
      ? books[i].isbn13
      : `${books[i].authors} ${books[i].title}`

    try {
      const response = await axios.get(`${API_URL}${bookIdentifier}`);

      const bestMatch = {
        authors: _.toString(response.data.items[0].volumeInfo.authors),
        title: response.data?.items[0]?.volumeInfo?.title,
        isbn13: response.data?.items[0]?.volumeInfo?.industryIdentifiers[0]?.identifier
      }

      const mergedResult = _.mergeWith(bestMatch, books[i], (target, source) => source.length === 0 ? target : source);

      books[i] = mergedResult;

      progressBar.update(i);
    } catch (error) {
      console.log('Broken entry!!!');
      console.table(books[i]);
    }
  }

  progressBar.stop();

  return books;
}

module.exports = getBooksFromGoogleApi;