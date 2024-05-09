import { convertCsvToJson, generateTextEmbedding, generateJsonEmbedding } from '../lib/Index'
import { extractDetailsToEmbed, generateEmbedding } from '../common/utils'
import {
  CSV_TO_JSON_SUCCESS_MESSAGE,
  TEXT_EMBEDDING_SUCCESS_MESSAGE,
  JSON_EMBEDDING_SUCCESS_MESSAGE,
  EXTRACTED_ONLY_IMPORTANT_MESSAGE,
} from '../common/consoleMessage'

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

export async function initializeConversionAndEmbeddingGeneration(
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
    const reply = await generateTextEmbedding(textToEmbed)
    console.log(TEXT_EMBEDDING_SUCCESS_MESSAGE)

    // Generate JSON object embedding
    const extractedDetailsToEmbed = await extractDetailsToEmbed(jsonFilePath)
    console.log(EXTRACTED_ONLY_IMPORTANT_MESSAGE)    

    const result = await generateEmbedding(extractedDetailsToEmbed)
    console.log(JSON_EMBEDDING_SUCCESS_MESSAGE);
    console.log(result);
    
    

  } catch (error) {
    // Handle errors during initialization
    throw new Error(
      `Initialization failed: ${error instanceof Error ? error.message : 'Unexpected error occurred.'}`,
    )
  }
}
