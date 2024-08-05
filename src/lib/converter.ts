import csv from 'csvtojson'
import fs from 'fs'
import { promisify } from 'util'
import { promises as fsp } from 'fs'
import { CSV, DataObject, EmbeddingResult, Convert } from '../types/index.d'
import { UpsertData } from './database'
const writeFileAsync = promisify(fs.writeFile)
import OpenAIService from '../lib/embeddings'
import MessageConstants from '../common/consoleMessage'

/**
 * Converter class for converting CSV to JSON and generating embeddings.
 */

class Converter implements Convert {
  private readonly csvFilePath: string
  private readonly jsonFilePath: string

  constructor(csvFilePath: string, jsonFilePath: string) {
    this.csvFilePath = csvFilePath
    this.jsonFilePath = jsonFilePath
  }

  /**
   * Converts a CSV file to a JSON file and generates embeddings for each entry.
   *
   * @returns The converted JSON data.
   * @throws An error if there is an issue with the CSV or JSON file, or with generating embeddings.
   */
  public async convertCsvToJson(): Promise<EmbeddingResult[]> {
    try {
      const jsonData: CSV[] = await csv().fromFile(this.csvFilePath)
      const jsonResponse = JSON.stringify(jsonData, null, 2)
      await writeFileAsync(this.jsonFilePath, jsonResponse, 'utf8')

      const extractedDetails = await this.extractDetailsToEmbed(this.jsonFilePath)
      console.log(MessageConstants.EXTRACTED_ONLY_IMPORTANT_MESSAGE)

      const embeddings = await this.generateEmbeddings(extractedDetails)
      console.log(MessageConstants.INTO_SINGLE_STRING_MESSAGE)

      await UpsertData(embeddings)

      return embeddings
    } catch (error) {
      console.error('Error processing CSV and adding embeddings:', error)
      throw error
    }
  }

  /**
   * Extracts specific details from a JSON file and returns them as an array of objects.
   *
   * @param jsonFilePath - The path to the JSON file.
   * @returns An array of objects containing the extracted details.
   * @throws An error if the JSON file is not an array or if there's an error reading or parsing the file.
   */
  private async extractDetailsToEmbed(jsonFilePath: string): Promise<DataObject[]> {
    try {
      const data = await fsp.readFile(jsonFilePath, 'utf8')
      const jsonData = JSON.parse(data)

      if (!Array.isArray(jsonData)) {
        throw new Error('JSON data is not an array.')
      }

      const extractedDetails: DataObject[] = jsonData
        .filter((item) => typeof item === 'object' && !Array.isArray(item))
        .map((item) => ({
          Id: item.Id || '',
          Title: item['Title'] || '',
          Industry: item['Industry'] || '',
          State: item['State'] || '',
          City: item['City'] || '',
        }))


      return extractedDetails
    } catch (error) {
      throw new Error(
        `Error processing JSON file: ${error instanceof Error ? error.message : error}`,
      )
    }
  }

  /**
   * Generates embeddings for each entry in the provided data.
   *
   * @param data - The data to generate embeddings for.
   * @returns An array of objects containing the ID and embedding values for each entry.
   * @throws An error if no data is provided.
   */
  protected async generateEmbeddings(data: DataObject[]): Promise<EmbeddingResult[]> {
    if (!data) {
      throw new Error('No data provided for embedding generation.')
    }

    const embeddings: EmbeddingResult[] = []
    const embeddingsService = new OpenAIService()

    for (const item of data) {
      try {
        const jsonData = JSON.stringify(item).replace(/[{,":}"}]/g, ' ')
        const embedding = await embeddingsService.generateEmbedding(jsonData)


        console.log(jsonData);
        

        embeddings.push({ id: item.Id, values: embedding })
      } catch (error) {
        console.error(
          `Error generating embedding for key "${item.Id}": ${error instanceof Error ? error.message : error}`,
        )
      }
    }

    return embeddings
  }
}

export default Converter
