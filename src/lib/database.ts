/* Database */

import type { EmbeddingResult, IndexList, IndexInfo } from '../types/index.d'
import generateTextEmbedding from './embeddings'
import { pc } from '../config/index'
const indexName = 'example-index'
const namespace = 'example-namespace'
const index = pc.Index(indexName)
const BATCH_SIZE = 100
export async function batchUpsertData(data: EmbeddingResult[]): Promise<void> {
  const batches = []
  for (let i = 0; i < data.length; i += BATCH_SIZE) {
    batches.push(data.slice(i, i + BATCH_SIZE))
  }

  for (const batch of batches) {
    const vectors = batch.map((item) => ({
      id: item.id,
      values: item.values,
    }))

    try {
      console.log('data ready to upsert')
      const upsert = await index.upsert(vectors)
    } catch (error) {
      console.error('Error upserting batch:', error)
    }
  }
}

export async function createIndex(): Promise<void> {
  try {
    const existingIndexes: IndexList = (await pc.listIndexes()) as IndexList
    if (!existingIndexes.indexes.some((index: IndexInfo) => index.name === indexName)) {
      await pc.createIndex({
        name: indexName,
        dimension: 1536,
        metric: 'euclidean',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1',
          },
        },
      })
      console.log('Index created successfully.')
    } else {
      console.log('Index already exists.')
    }
  } catch (error) {
    console.error('Error creating index:', error)
  }
}

export async function searchQuery(query: string): Promise<EmbeddingResult[]> {
  if (!query) {
    throw new Error('Query values must be a string')
  }
  const genEmbedding = await generateTextEmbedding(query.toString())

  console.log('Query Embeddings')

  console.log('Generated Query Embedding:')
  const response = await index.namespace(namespace).query({
    topK: 10,
    vector: genEmbedding,
    includeValues: true,
  })

  return response.matches
}
