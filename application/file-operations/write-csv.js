const fs = require('fs');
const converter = require('json-2-csv');

async function writeCsvFileSync(filePath, csvData) {
  const csvString = await converter.json2csv(csvData);
  const outputFilePath = filePath.replace('.csv', '-output.csv');

  fs.writeFileSync(outputFilePath, csvString, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('CSV file has been written successfully!');
  });
}

module.exports = writeCsvFileSync;