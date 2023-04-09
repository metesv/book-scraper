const getBookPriceFromDr = require('../scraping-operations/dr-scraper.js');
const getBookPriceFromIdefix = require('../scraping-operations/idefix-scraper.js');

async function makeParallelApiCall(booksArray) {
  const midpoint = Math.ceil(booksArray.length / 2);
  const firstHalf = booksArray.slice(0, midpoint);
  const secondHalf = booksArray.slice(midpoint);

  try {
    const [response1, response2] = await Promise.all([
      getBookPriceFromIdefix(firstHalf),
      getBookPriceFromDr(secondHalf)
    ]);

    const jsonData1 = Object.values(response1);
    const jsonData2 = Object.values(response2);

    const combinedResults = [...jsonData1, ...jsonData2];
    return combinedResults;
  } catch (error) {
    console.log(error);
  }

  return booksArray;
}

module.exports = makeParallelApiCall;