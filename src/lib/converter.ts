import csv from 'csvtojson'
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'
import { FilePath } from '../config/index'
import { ConversionAndEmbeddingService } from './Initialize'
const writeFileAsync = promisify(fs.writeFile)

class Converter {
  protected CSV_FILE_PATH: string
  protected JSON_FILE_PATH: string
  protected JSON_WRITE_PATH?: string

  constructor(CSV_FILE_PATH: string, JSON_FILE_PATH: string, JSON_WRITE_PATH?: string) {
    this.CSV_FILE_PATH = CSV_FILE_PATH
    this.JSON_FILE_PATH = JSON_FILE_PATH
    this.JSON_WRITE_PATH = JSON_WRITE_PATH
  }

  async convertCsvToJson(CSV_FILE_PATH: string, JSON_FILE_PATH: string, JSON_WRITE_PATH?: string) {
    try {
      const jsonArray = await csv().fromFile(CSV_FILE_PATH)
      // jsonArray.forEach((entry, index) => {
      //   entry.embedding = jsonEmbedding[index]
      // })

      const jsonContent = JSON.stringify(jsonArray, null, 2)

      await writeFileAsync(JSON_FILE_PATH, jsonContent, 'utf8')

      return jsonArray
    } catch (error) {
      console.error('Error processing CSV and adding embeddings:', error)
      throw error
    }
  }
}

export default Converter
