import { promises as fsp } from 'fs'
import { generateTextEmbedding } from '../lib/Index'
import { EmbeddingResult, DataObject } from '../types/index.d'
import Converter from '../lib/converter'

class EmbeddingProcessor extends Converter {
  /**
   * Extracts specific details from a JSON file and returns them as an array of objects.
   *
   * This function reads a JSON file at the specified path, parses the content, and then
   * extracts particular properties from each JSON object in the array. The expected
   * properties are Title, Industry, State, and City. It filters out any invalid or
   * non-object entries in the array.
   *
   * @returns An array of objects containing the extracted details.
   * @throws Will throw an error if the jsonFilePath is null or undefined, if the JSON data is not an array,
   *         or if there's an error in reading or parsing the JSON file.
   */
  static async extractDetailsToEmbed(jsonFilePath: string): Promise<DataObject[]> {
    try {
      // Read the file and parse the JSON
      const data = await fsp.readFile(jsonFilePath, 'utf8')
      const jsonData = JSON.parse(data)

      // Check if the parsed data is an array
      if (!Array.isArray(jsonData)) {
        throw new Error('JSON data is not an array.')
      }

      // Map through the array and extract the required details
      const extractedDetails: DataObject[] = jsonData
        .filter((item) => typeof item === 'object' && !Array.isArray(item))
        .map((item) => ({
          Title: item['Title'] || '',
          Industry: item['Industry'] || '',
          State: item['State'] || '',
          City: item['City'] || '',
        }))

      return extractedDetails
    } catch (error) {
      // Handle any errors during file reading or JSON parsing
      throw new Error(
        `Error processing JSON file: ${error instanceof Error ? error.message : error}`,
      )
    }
  }

  /**
   * Generates embeddings for each key-value pair in the provided data object.
   *
   * @param data The data object for which embeddings are to be generated.
   * @returns An array of objects containing the key and its corresponding embedding.
   * @throws Will throw an error if the data object is null or undefined.
   */
  static async generateEmbedding(data: DataObject[]): Promise<EmbeddingResult[]> {
    if (!data) {
      throw new Error('No data provided for embedding generation.')
    }

    const embeddings: EmbeddingResult[] = []
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        try {
          // Convert the value associated with the key to a JSON string
          const jsonData = JSON.stringify((data as any)[key]).replace(/[{,":}"}]/g, ' ')
          console.log('Cleaned JSON Data:')

          // Generate the embedding for the jsonData
          const embedding = await generateTextEmbedding(jsonData)
          embeddings.push({ id: key, values: embedding })
        } catch (error) {
          // Handle any errors during JSON stringification or embedding generation
          console.error(
            `Error generating embedding for key "${key}": ${error instanceof Error ? error.message : error}`,
          )
        }
      }
    }
    return embeddings
  }
}

export default EmbeddingProcessor
