import csv from 'csvtojson'; // Importing csvtojson module for CSV to JSON conversion
import fs from 'fs'; // Importing file system module for file operations

/**
 * Converts a CSV file to JSON format and writes the JSON data to a file.
 * @param {string} filePath - Path to the input CSV file.
 * @param {string} outputFilePath - Path to the output JSON file.
 * @returns {Promise<void>} A Promise that resolves when the conversion is complete.
 */
async function csvToJSON(filePath: string, outputFilePath: string): Promise<void> {
  try {
    // Convert CSV to JSON
    const jsonArray = await csv().fromFile(filePath);
    console.log('CSV converted to JSON:', jsonArray);

    // Write JSON data to file
    fs.writeFileSync(outputFilePath, JSON.stringify(jsonArray, null, 2), 'utf8');
    console.log('JSON data written to file:', outputFilePath);
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
    throw error; // Re-throwing the error for higher-level error handling
  }
}

export default csvToJSON;
