import { Converter } from '../lib/Index'
import MessageConstants from '../common/consoleMessage'
import Watcher from '../common/watcher'
// import type { DataObject, EmbeddingResult } from '../types/index.d'

export class InitializationService {
  private readonly csvFilePath: string
  private readonly jsonFilePath: string
  // public jsonEmbedding: EmbeddingResult[] = []

  constructor(csvFilePath: string, jsonFilePath: string) {
    this.validateInputs(csvFilePath, jsonFilePath)

    this.csvFilePath = csvFilePath
    this.jsonFilePath = jsonFilePath
  }

  private async validateInputs(csvFilePath: string, jsonFilePath: string): Promise<void> {
    if (!csvFilePath || !jsonFilePath) {
      throw new Error(MessageConstants.INITIALIZATION_ERROR_MESSAGE)
    }
  }

  async initializeApplication() {
    try {
      const converter = new Converter(this.csvFilePath, this.jsonFilePath)
      const data = await converter.convertCsvToJson()

      if (data.length > 0) {
        const watcher_index = new Watcher()
        const lastKey = data[data.length - 1].id
        return await watcher_index.watch(lastKey, data.length)
      } else {
        throw new Error('No data available to watch.')
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private handleError(error: unknown): Error {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error occurred.'
    const initializationFailedMessage = `Initialization failed: ${errorMessage}`
    return new Error(initializationFailedMessage)
  }
}
// this.jsonEmbedding = await Converter.ConvertInputTextIntoString(extractedDetailsToEmbed)
// console.log(MessageConstants.JSON_EMBEDDING_SUCCESS_MESSAGE)
// const createIndexResult: boolean = await createIndex()
// const upsertData: boolean = await batchUpsertData(this.jsonEmbedding)
// console.log(MessageConstants.UPSERT_SUCCESS_MESSAGE)
