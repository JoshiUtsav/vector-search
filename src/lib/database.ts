/* Database */
import type { EmbeddingResult, IndexList, IndexInfo } from '../types/index.d'
import generateTextEmbedding from './embeddings'
import { pc } from '../config/index'

const indexName = 'example-index'
const namespace = 'example-namespace'
const index = pc.Index(indexName)

/**
 * Upserts a batch of embedding results into the index.
 * @param data - The array of embedding results to upsert.
 * @returns A Promise that resolves to a boolean indicating whether the upsert was successful.
 */
export async function batchUpsertData(data: EmbeddingResult[]): Promise<boolean> {
  const BATCH_SIZE: number = 100;
  const batches: EmbeddingResult[][] = [];

  // Create batches
  for (let i: number = 0; i < data.length; i += BATCH_SIZE) {
    batches.push(data.slice(i, i + BATCH_SIZE));
  }

  // Process each batch
  for (const batch of batches) {
    const vectors: { id: string; values: number[]; }[] = batch.map((item: EmbeddingResult) => ({
      id: item.id,
      values: item.values,
    }));

    try {
      await index.upsert(vectors);
    } catch (error: any) {
      console.error('Error upserting batch:', error);
      return false;
    }
  }

  return true;
}

/**
 * Creates an index if it does not already exist.
 * @returns A Promise that resolves to a boolean indicating whether the index was created successfully.
 * @throws {Error} If there was an error creating the index.
 */
export async function createIndex(): Promise<boolean> {
  try {
    const existingIndexes: IndexList = (await pc.listIndexes()) as IndexList;
    if (!existingIndexes.indexes.some((index: IndexInfo) => index.name === indexName)) {
      await pc.createIndex({
        name: indexName,
        dimension: 1536,
        metric: 'euclidean',
        spec: {
          serverless: {
            cloud: 'aws' as const,
            region: 'us-east-1' as const,
          },
        },
      });
      console.log('Index created successfully.');
    } else {
      console.log('Index already exists.');
    }
  } catch (error: unknown) {
    console.error('Error creating index:', error);
    return false;
  }
  return true;
}
