import csv from 'csvtojson';
import fs from 'fs';

export async function csvtojson(filePath: string, outputFilePath: string): Promise<void> {
  try {
    const jsonArray = await csv().fromFile(filePath);
    console.log('CSV converted to JSON:', jsonArray);

    // Write JSON data to file
    fs.writeFileSync(outputFilePath, JSON.stringify(jsonArray, null, 2), 'utf8');
    console.log('JSON data written to file:', outputFilePath);
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
    throw error;
  }
}
