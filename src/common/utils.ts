import fs from 'fs'
import { promises as fsp } from 'fs'
import { convertCsvToJson, generateTextEmbedding, generateJsonEmbedding } from '../lib/Index'

interface DataObject {
  [key: string]: any
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
 * Initializes the conversion of a CSV file to JSON and creates text and JSON embeddings.
 *
 * This function takes the paths to a CSV file and a JSON file, as well as text and a JSON object
 * to be converted into embeddings. It performs the conversion of the CSV to JSON, generates an
 * embedding from the given text, and creates an embedding from the JSON object. It logs the progress
 * and throws an error if any step fails.
 *
 * @param csvFilePath Path to the CSV file to be converted.
 * @param jsonFilePath Path where the converted JSON file will be saved.
 * @param textToEmbed Text to be converted into an embedding.
 * @throws Will throw an error if the input parameters are invalid or if any operation fails.
 */

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
export async function extractDetailsToEmbed(jsonFilePath: string) {
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
      .filter((item) => item !== null) // Filter out the null
  } catch (error) {
    // Handle any errors during file reading or JSON parsing
    throw new Error(`Error processing JSON file: ${error instanceof Error ? error.message : error}`)
  }
}

export async function newEmbed(data: DataObject) {
  if (!data) {
    throw new Error('No data provided for embedding generation.')
  }
  let result;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const values = data[key]
      const convertToString = JSON.stringify(values)
      const convertedJsonData = convertToString.replace(/[{,"}]/g, '')
      result = await generateJsonEmbedding(convertedJsonData)
    }
  }
}
