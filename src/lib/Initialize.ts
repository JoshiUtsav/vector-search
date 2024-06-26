import { convertCsvToJson, generateTextEmbedding, writingEmbeddingIntoJson } from '../lib/Index'
import { extractDetailsToEmbed, generateEmbedding } from '../common/utils'
import {
  CSV_TO_JSON_SUCCESS_MESSAGE,
  TEXT_EMBEDDING_SUCCESS_MESSAGE,
  JSON_EMBEDDING_SUCCESS_MESSAGE,
  EXTRACTED_ONLY_IMPORTANT_MESSAGE,
  JSON_SUCCESS_MESSAGE,
  UPSERT_SUCCESS_MESSAGE,
} from '../common/consoleMessage'

import { batchUpsertData, createIndex } from '../lib/database'

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
  textToEmbed?: string,
): Promise<void> {
  // Validate input parameters
  if (!csvFilePath || !jsonFilePath) {
    throw new Error('Invalid input: one or more parameters are null or undefined.')
  }

  try {
    // Convert CSV to JSON
    const converted = await convertCsvToJson(csvFilePath, jsonFilePath)
    console.log(CSV_TO_JSON_SUCCESS_MESSAGE)

    // Extracted JSON object embedding
    const extractedDetailsToEmbed = await extractDetailsToEmbed(jsonFilePath)
    console.log(EXTRACTED_ONLY_IMPORTANT_MESSAGE)

    // Generated JSON embeddings
    const jsonEmbedding = await generateEmbedding(extractedDetailsToEmbed)
    console.log(JSON_EMBEDDING_SUCCESS_MESSAGE)

    // Wrote Embdedding into JSON
    const result = await writingEmbeddingIntoJson(jsonEmbedding)
    console.log(JSON_SUCCESS_MESSAGE)

    const createIndexResult = await createIndex()

    // Data Upeserted to database
    const upsertData = await batchUpsertData(jsonEmbedding)
    console.log(UPSERT_SUCCESS_MESSAGE)
  } catch (error) {
    throw new Error(
      `Initialization failed: ${error instanceof Error ? error.message : 'Unexpected error occurred.'}`,
    )
  }
}
