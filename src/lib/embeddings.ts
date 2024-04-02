import { OpenAI } from 'openai'; // Importing OpenAI module
import { OPENAI_SECRET_KEY } from '../config/index'; // Importing OpenAI secret key from configuration

// Creating an instance of OpenAI with the provided secret key
const openai = new OpenAI({
  apiKey: OPENAI_SECRET_KEY
});

/**
 * Creates an embedding for the given text using OpenAI's text-embedding model.
 */
async function createEmbedding() {
  try {
    // Generating embedding for the input text
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: 'Your text string goes here',
      encoding_format: 'float'
    });

    console.log('Embedding created:', embedding);
  } catch (error) {
    console.error('Error creating embedding:', error);
  }
}

export default createEmbedding;
