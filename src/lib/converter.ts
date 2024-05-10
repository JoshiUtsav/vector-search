import csv from 'csvtojson';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const writeFileAsync = promisify(fs.writeFile);

const CSV_FILE_PATH = path.resolve(__dirname, '../../public/data.csv');
const JSON_FILE_PATH = path.resolve(__dirname, '../../public/data.json');

async function convertCsvToJson(csvFilePath:string, jsonFilePath:string) {
  try {
    const jsonArray = await csv().fromFile(csvFilePath);
    const jsonContent = JSON.stringify(jsonArray, null, 2);
    await writeFileAsync(jsonFilePath, jsonContent, 'utf8');
    return jsonArray;
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
    throw error; // Rethrow the error for handling at higher levels
  }
}

async function sendingEmbeddingIntoJson(jsonEmbedding: any) {
  try {
    const jsonArray = await convertCsvToJson(CSV_FILE_PATH, JSON_FILE_PATH);
    jsonArray.forEach((entry, index) => {
      entry.embedding = jsonEmbedding[index];
    });
    const jsonContent = JSON.stringify(jsonArray, null, 2);
    await writeFileAsync(JSON_FILE_PATH, jsonContent, 'utf8');
    return jsonArray;
  } catch (error) {
    console.error('Error sending embedding into JSON:', error);
    throw error; // Rethrow the error for handling at higher levels
  }
}

export default convertCsvToJson;
export { sendingEmbeddingIntoJson };
