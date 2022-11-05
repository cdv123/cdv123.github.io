// from https://joshtronic.com/2022/05/15/how-to-convert-csv-to-json-in-javascript/ accessed 5 Nov 2022

const fs = require('fs');
const Papa = require('papaparse');

const file = 'Dataset/shortSurvey.csv';
const csvData = fs.readFileSync(file, 'utf8');

const jsonData = Papa.parse(csvData, { header: true });

console.log(jsonData)