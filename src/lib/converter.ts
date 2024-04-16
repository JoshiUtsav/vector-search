import csv from 'csvtojson' // Importing csvtojson module for CSV to JSON conversion
import fs from 'fs' // Importing file system module for file operations

/**
 * Converts CSV content to JSON and writes it to a specified file.
 * @param csvFilePath The path to the source CSV file.
 * @param jsonFilePath The path for the output JSON file.
 * @returns A promise that resolves when conversion and writing are complete.
 */
async function convertCsvToJson(csvFilePath: string, jsonFilePath: string): Promise<void> {
  const jsonArray = await csv().fromFile(csvFilePath)
  const varN = "Hello"
  jsonArray.forEach((obj) => {
    obj.embedding = [varN]
  })
  const jsonContent = JSON.stringify(jsonArray, null, 2)
  fs.writeFileSync(jsonFilePath, jsonContent, 'utf8')
}

export default convertCsvToJson
