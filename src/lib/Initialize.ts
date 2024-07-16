import { Converter, generateTextEmbedding } from '../lib/Index'
import MessageConstants from '../common/consoleMessage'
import { batchUpsertData, createIndex } from '../lib/database'
import type { DataObject, EmbeddingResult } from '../types/index.d'

export class ConversionAndEmbeddingService extends Converter {
  public jsonEmbedding: EmbeddingResult[] = []
  constructor(CSV_FILE_PATH: string, JSON_FILE_PATH: string, textToEmbed: string) {
    super(CSV_FILE_PATH, JSON_FILE_PATH, textToEmbed)
  }

  async initializeConversionAndEmbeddingGeneration(): Promise<void> {
    if (!this.CSV_FILE_PATH || !this.JSON_FILE_PATH || !this.JSON_WRITE_PATH) {
      throw new Error('Invalid input: one or more parameters are null or undefined.')
    }

    try {
      const converted: object[] = await this.convertCsvToJson(
        this.CSV_FILE_PATH,
        this.JSON_FILE_PATH,
        this.JSON_WRITE_PATH,
      )
      console.log(MessageConstants.CSV_TO_JSON_SUCCESS_MESSAGE)

      const extractedDetailsToEmbed: DataObject[] = await Converter.extractDetailsToEmbed(
        this.JSON_FILE_PATH,
      )
      console.log(MessageConstants.EXTRACTED_ONLY_IMPORTANT_MESSAGE)

      this.jsonEmbedding = await Converter.generateEmbedding(extractedDetailsToEmbed)
      console.log(MessageConstants.JSON_EMBEDDING_SUCCESS_MESSAGE)

      const createIndexResult: boolean = await createIndex()

      const upsertData: boolean = await batchUpsertData(this.jsonEmbedding)
      console.log(MessageConstants.UPSERT_SUCCESS_MESSAGE)
    } catch (error) {
      throw new Error(
        `Initialization failed: ${error instanceof Error ? error.message : 'Unexpected error occurred.'}`,
      )
    }
  }
}
