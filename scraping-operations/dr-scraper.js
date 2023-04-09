const axios = require('axios');
const cheerio = require('cheerio');

async function getBookPriceFromDr(books) {
  try {
    for (let i = 0; i < books.length; i++) {
      let query = books[i].isbn13.length > 0
        ? books[i].isbn13
        : books[i].title

      const response = await axios.get(`https://www.dr.com.tr/Search?q=${query}&redirect=search`);
      const $ = cheerio.load(response.data);

      const bookPrices = $("[data-price]").text().replace(/ |\n/g, '');
      console.log(bookPrices);
      const firstPrice = bookPrices.split('TL')[0];
      books[i].price = firstPrice;
    }

    return books;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getBookPriceFromDr;

