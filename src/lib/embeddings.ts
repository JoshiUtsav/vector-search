import { OpenAI } from 'openai'
import { openai } from '../config/index' // Importing OpenAI secret key from configuration

class OpenAIService {
  private openai: OpenAI
  constructor() {
    this.openai = openai // Initialize the openai instance
  }
  /**
   * Generates an embedding vector for a specified text using OpenAI's model.
   * @param text The text to generate the embedding for.
   * @returns {Promise<number[]>} A Promise containing the embedding vector.
   */
  async generateEmbedding(text: string): Promise<number[]> {
    if (!text) {
      throw new Error('No text provided for embedding generation.')
    }

    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
        encoding_format: 'float',
      })

      // Ensure 'embeddings' property exists in the response and return it
      if (Array.isArray(response?.data) && response?.data?.length > 0) {
        return response.data[0].embedding
      } else {
        throw new Error('Embeddings not found in the response')
      }
    } catch (error) {
      throw new Error(
        `Failed to generate embedding: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }
}

export default OpenAIService
