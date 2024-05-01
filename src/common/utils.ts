import fs from 'fs'
import { promises as fsp } from 'fs';
import { convertCsvToJson, generateTextEmbedding, generateJsonEmbedding } from '../lib/Index'
const CSV_TO_JSON_SUCCESS_MESSAGE = 'CSV to JSON conversion complete.'
const TEXT_EMBEDDING_SUCCESS_MESSAGE = 'Text embedding creation successful.'
const JSON_EMBEDDING_SUCCESS_MESSAGE = 'JSON object embedding created successfully'
const AFTER_SENDING_ONE_BY_ONE_MESSAGE =
  'Sending Object one by one as a string for generating embeddings.'

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

export async function initializeConversionAndEmbedding(
  csvFilePath: string,
  jsonFilePath: string,
  textToEmbed: string,
): Promise<void> {
  // Validate input parameters
  if (!csvFilePath || !jsonFilePath || !textToEmbed) {
    throw new Error('Invalid input: one or more parameters are null or undefined.')
  }

  try {
    // Convert CSV to JSON
    await convertCsvToJson(csvFilePath, jsonFilePath)
    console.log(CSV_TO_JSON_SUCCESS_MESSAGE)

    // Generate text embedding
    await generateTextEmbedding(textToEmbed)
    console.log(TEXT_EMBEDDING_SUCCESS_MESSAGE)

    // Generate JSON object embedding
    const result = await extractDetailsToEmbed(jsonFilePath)
    console.log("GFO")
    

  } catch (error) {
    // Handle errors during initialization
    throw new Error(
      `Initialization failed: ${error instanceof Error ? error.message : 'Unexpected error occurred.'}`,
    )
  }
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
async function extractDetailsToEmbed(jsonFilePath: string) {
  // Ensure the file path is provided
  if (!jsonFilePath) {
    throw new Error('JSON file path must not be null or undefined.');
  }

  try {
    // Read the file and parse the JSON
    const data = await fsp.readFile(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Check if the parsed data is an array
    if (!Array.isArray(jsonData)) {
      throw new Error('JSON data is not an array.');
    }

    // Map through the array and extract the required details
    return jsonData.map((item) => {
      // Process only if the item is an object and not an array
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        return {
          Title: item['Title'],     // Extract the Title
          Industry: item['Industry'], // Extract the Industry
          State: item['State'],     // Extract the State
          City: item['City'],       // Extract the City
        };
      }
      // Return null for any item that doesn't match the criteria
      return null;
    }).filter(item => item !== null); // Filter out the null items

  } catch (error) {
    // Handle any errors during file reading or JSON parsing
    throw new Error(`Error processing JSON file: ${error instanceof Error ? error.message : error}`);
  }
}


// 1. Create a common function to loop over the json data.