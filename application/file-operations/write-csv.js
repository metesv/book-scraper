const fs = require('fs');
const converter = require('json-2-csv');

async function writeCsvFileSync(csvData) {
  const csvString = await converter.json2csv(csvData);

  fs.writeFileSync('output.csv', csvString, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('CSV file has been written successfully!');
  });
}

module.exports = writeCsvFileSync;