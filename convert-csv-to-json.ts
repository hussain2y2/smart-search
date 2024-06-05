import * as fs from 'fs';
import * as path from 'path';
import csv from 'csvtojson';

const convertCsvToJson = async (csvFilePath: string, jsonFilePath: string) => {
  const jsonArray = await csv().fromFile(csvFilePath);
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2));
};

const csvFiles = [
  { csv: 'data/cities.csv', json: 'data/cities.json' },
  { csv: 'data/brands.csv', json: 'data/brands.json' },
  { csv: 'data/dish-types.csv', json: 'data/dish-types.json' },
  { csv: 'data/diets.csv', json: 'data/diets.json' },
];

csvFiles.forEach((file) => {
  const csvFilePath = path.join(__dirname, file.csv);
  const jsonFilePath = path.join(__dirname, file.json);

  convertCsvToJson(csvFilePath, jsonFilePath);
});
