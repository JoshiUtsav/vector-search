import { OpenAI } from 'openai' // Importing OpenAI module
import { OPENAI_SECRET_KEY } from '../config/index' // Importing OpenAI secret key from configuration

// Creating an instance of OpenAI with the provided secret key
const openai = new OpenAI({
  apiKey: OPENAI_SECRET_KEY,
})

/**
 * Generates an embedding vector for a specified text using OpenAI's model.
 * @param text The text to generate the embedding for.
 * @returns {Promise<number[]>} A Promise containing the embedding vector.
 */
async function generateTextEmbedding(text: string): Promise<number[]> {
  if (!text) {
    throw new Error('No text provided for embedding generation.')
  }

  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
      encoding_format: 'float',
    })

    // Ensure 'embeddings' property exists in the response and return it
    if (Array.isArray(response?.data) && response?.data?.length > 0) {
      return response?.data[0]?.embedding
    } else {
      throw new Error('Embeddings not found in the response')
    }
  } catch (error) {
    throw new Error(
      `Failed to generate embedding: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

/**
 * Generates an embedding vector for a specified JSON object using OpenAI's model.
 * @param jsonObject The JSON object to generate the embedding for as a string.
 * @returns {Promise<number[]>} A Promise containing the embedding vector.
 */
export async function generateJsonEmbedding(jsonObject: string): Promise<number[]> {
  if (!jsonObject) {
    throw new Error('JSON object is required for embedding generation.');
  }

  try {
    const { data } = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: jsonObject,
      encoding_format: 'float',
    });

    const embedding = data?.[0]?.embedding;
    if (!Array.isArray(embedding) || embedding.length === 0) {
      throw new Error('Embedding data not found in the response.');
    }    
    return embedding;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to generate embedding: ${errorMessage}`);
  }
}

export default generateTextEmbedding
