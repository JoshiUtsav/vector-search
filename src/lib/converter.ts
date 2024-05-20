import csv from 'csvtojson'
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'
import { CSV_FILE_PATH, JSON_FILE_PATH, JSON_FILE_PATH_EMBEDDED } from '../config/index'

const writeFileAsync = promisify(fs.writeFile)

async function convertCsvToJson(csvFilePath: string, jsonFilePath: string) {
  try {
    const jsonArray = await csv().fromFile(csvFilePath)
    await writeFileAsync(jsonFilePath, JSON.stringify(jsonArray, null, 2))
    return jsonArray
  } catch (error) {
    console.error('Error converting CSV to JSON:', error)
    throw error
  }
}

async function writingEmbeddingIntoJson(jsonEmbedding: any) {
  try {
    const jsonArray = await convertCsvToJson(CSV_FILE_PATH, JSON_FILE_PATH)
    jsonArray.forEach((entry, index) => {
      entry.embedding = jsonEmbedding[index]
    })
    const jsonContent = JSON.stringify(jsonEmbedding, null, 2)
    await writeFileAsync(JSON_FILE_PATH_EMBEDDED, jsonContent, 'utf8')
    return jsonArray
  } catch (error) {
    console.error('Error sending embedding into JSON:', error)
    throw error
  }
}

export default convertCsvToJson
export { writingEmbeddingIntoJson }
