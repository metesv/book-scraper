const axios = require('axios');
const cheerio = require('cheerio');
const cliProgress = require('cli-progress');

async function getBookPriceFromIdefix(books) {
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(books.length, 0);

  try {
    for (let i = 0; i < books.length; i++) {
      let query = books[i].isbn13.length > 0
        ? books[i].isbn13
        : books[i].title

      const response = await axios.get(`https://www.idefix.com/search?q=${query}&redirect=search`);
      const $ = cheerio.load(response.data);

      const bookPrices = $('#prices').text();
      const firstPrice = bookPrices.split('TL')[0];
      books[i].price = firstPrice;

      progressBar.update(i);
    }
    progressBar.stop();

    return books;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getBookPriceFromIdefix;

