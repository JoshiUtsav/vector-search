import fs from 'fs'
import { promises as fsp } from 'fs'
import { convertCsvToJson, generateJsonEmbedding } from '../lib/Index'
import { memoizeExtractDetails } from './Cache'

interface DataObject {
  [key: string]: any
}

interface EmbeddingResult {
  key: string 
  embedding: any 
}

/**
 * Sets up a watcher on a CSV file and converts it to JSON format upon any changes.
 *
 * This function watches for any changes to the specified CSV file. When a change is detected,
 * it triggers the conversion from CSV to JSON and saves the result to the given destination path.
 *
 * @param sourcePath The path to the source CSV file to watch.
 * @param destinationPath The path where the converted JSON file should be saved.
 */
function watchFileChange(sourcePath: string, destinationPath: string): void {
  const watcher = fs.watch(sourcePath, async (eventType) => {
    if (eventType === 'change') {
      try {
        await convertCsvToJson(sourcePath, destinationPath)
      } catch (error) {
        console.error('Failed:', error)
      }
    }
  })

  // Handle error event to prevent unhandled exceptions
  watcher.on('error', (error) => {
    console.error('Watcher error:', error)
  })

  // Log a message when watching starts
  console.log(`Watching for changes in ${sourcePath}...`)
}

/**
 * Extracts specific details from a JSON file and returns them as an array of objects.
 *
 * This function reads a JSON file at the specified path, parses the content, and then
 * extracts particular properties from each JSON object in the array. The expected
 * properties are Title, Industry, State, and City. It filters out any invalid or
 * non-object entries in the array.
 *
 * @param jsonFilePath The path to the JSON file to read and extract details from.
 * @returns An array of objects containing the extracted details.
 * @throws Will throw an error if the jsonFilePath is null or undefined, if the JSON data is not an array,
 *         or if there's an error in reading or parsing the JSON file.
 */
export async function extractDetailsToEmbed(jsonFilePath: string): Promise<any[]> {
  // Ensure the file path is provided
  if (!jsonFilePath) {
    throw new Error('JSON file path must not be null or undefined.')
  }

  try {
    // Read the file and parse the JSON
    const data = await fsp.readFile(jsonFilePath, 'utf8')
    const jsonData = JSON.parse(data)

    // Check if the parsed data is an array
    if (!Array.isArray(jsonData)) {
      throw new Error('JSON data is not an array.')
    }

    // Map through the array and extract the required details
    return jsonData
      .map((item) => {
        // Process only if the item is an object and not an array
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          return {
            Title: item['Title'], // Extract the Title
            Industry: item['Industry'], // Extract the Industry
            State: item['State'], // Extract the State
            City: item['City'], // Extract the City
          }
        }
        // Return null for any item that doesn't match the criteria
        return null
      })
      .filter((item) => item !== null) // Filter out the

    // Memoize the result
  } catch (error) {
    // Handle any errors during file reading or JSON parsing
    throw new Error(`Error processing JSON file: ${error instanceof Error ? error.message : error}`)
  }
}

export async function generateEmbedding(data: DataObject): Promise<EmbeddingResult[]> {
  if (!data) {
    throw new Error('No data provided for embedding generation.')
  }

  const embeddings: EmbeddingResult[] = []

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const jsonData = JSON.stringify(data[key]).replace(/[{,"}]/g, '')
      const embedding = await generateJsonEmbedding(jsonData)
      embeddings.push({ key, embedding })
    }
  }

  return embeddings
}
