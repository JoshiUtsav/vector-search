import fs from 'fs'
import { convertCsvToJson, generateTextEmbedding, generateJsonEmbedding } from '../lib/Index'
const CSV_TO_JSON_SUCCESS_MESSAGE = 'CSV to JSON conversion complete.'
const TEXT_EMBEDDING_SUCCESS_MESSAGE = 'Text embedding creation successful.'
const JSON_EMBEDDING_SUCCESS_MESSAGE = 'JSON object embedding created successfully'
const AFTER_SENDING_ONE_BY_ONE_MESSAGE = 'Sending Object one by one as a string for generating embeddings.'

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
    const result = await embedEachObject([
      { name: 'Ust', caste: 'joshi' },
      { name: 'Har', caste: 'Haha' },
    ])    

  } catch (error) {
    // Handle errors during initialization
    throw new Error(
      `Initialization failed: ${error instanceof Error ? error.message : 'Unexpected error occurred.'}`,
    )
  }
}


/**
 * Asynchronously embeds each object in the provided JSON array.
 * This function converts each object to a JSON string and then
 * generates an embedding for it.
 *
 * @param jsonArray An array of objects to be embedded.
 * @returns A promise that resolves with an array of embeddings.
 */
async function embedEachObject(jsonArray: any[]): Promise<any[]> {
  // Log message indicating the process of sending objects one by one
  console.log(AFTER_SENDING_ONE_BY_ONE_MESSAGE);

  // Map each object to a promise of its embedding
  return Promise.all(jsonArray.map(async (item) => {
    // Convert the item to a JSON string
    const jsonEmbedding = JSON.stringify(item);
    // Generate embedding for the JSON string
    return generateJsonEmbedding(jsonEmbedding);
  }));
}

async function sendEmbeddingIntoDB(){} // This function will take two arg 2, frst is the json file path and second the embedding.
export default watchFileChange