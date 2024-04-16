import fs from 'fs'
import { convertCsvToJson, generateTextEmbedding, generateJsonEmbedding } from '../lib/Index'

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

const CSV_TO_JSON_SUCCESS_MESSAGE = 'CSV to JSON conversion complete.'
const TEXT_EMBEDDING_SUCCESS_MESSAGE = 'Text embedding creation successful.'
const JSON_EMBEDDING_SUCCESS_MESSAGE = 'JSON object embedding created successfully'

export async function initializeConversionAndEmbedding(
  csvFilePath: string,
  jsonFilePath: string,
  textToEmbed: string,
  jsonToEmbed: object,
) {
  if (!csvFilePath || !jsonFilePath || !textToEmbed || !jsonToEmbed) {
    throw new Error('Invalid input: one or more parameters are null or undefined.')
  }

  const ConvertJSON = JSON.stringify(jsonToEmbed)
  const simplifiedString = ConvertJSON.replace(/[{"}]/g, '')

  try {
    await convertCsvToJson(csvFilePath, jsonFilePath)
    console.log(CSV_TO_JSON_SUCCESS_MESSAGE)

    await generateTextEmbedding(textToEmbed)
    console.log(TEXT_EMBEDDING_SUCCESS_MESSAGE)

    await generateJsonEmbedding(ConvertJSON)
    console.log(JSON_EMBEDDING_SUCCESS_MESSAGE)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Initialization failed: ${error.message}`)
    } else {
      throw new Error('Initialization failed due to an unexpected error.')
    }
  }
}

export default watchFileChange
