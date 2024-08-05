/* Database */

// Pinecone Database
import { pc } from '../config/index'
import { DATABASE_URL, DB_NAME } from '../config/index'
import mongoose from 'mongoose'

const indexName = 'founder-data'
const index = pc.Index(indexName)

import MessageConstants from '../common/consoleMessage'
import type { EmbeddingResult, IndexList, IndexInfo } from '../types/index.d'

/**
 * Upserts a batch of embedding results into the index.
 * @param data - The array of embedding results to upsert.
 * @returns A Promise that resolves to a boolean indicating whether the upsert was successful.
 */
export async function UpsertData(data: EmbeddingResult[]): Promise<boolean> {
  const vectors: { id: string; values: number[] }[] = data.map((item: EmbeddingResult) => ({
    id: item.id,
    values: item.values,
  }))

  try {
    await index.namespace('example').upsert(vectors)
    console.log(MessageConstants.UPSERT_SUCCESS_MESSAGE)
  } catch (error: any) {
    console.error('Error upserting batch:', error)
    return false
  }

  return true
}

export async function QueryData(data: number[]) {
  const QueryData = await index.namespace('example').query({
    vector: data,
    topK: 3,
    includeValues: true,
  })
  return QueryData
}

/**
 * Creates an index if it does not already exist.
 * @returns A Promise that resolves to a boolean indicating whether the index was created successfully.
 * @throws {Error} If there was an error creating the index.
 */
export async function createIndex(): Promise<boolean> {
  try {
    const existingIndexes: IndexList = (await pc.listIndexes()) as IndexList
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
      })
      console.log('Index created successfully.')
    } else {
      console.log('Index already exists.')
    }
  } catch (error: unknown) {
    console.error('Error creating index:', error)
    return false
  }
  return true
}

// Postgres daatabase

export default function Postgres_connection() {
  console.log('Connecting to Postgres')
}

// // Create batches
// const BATCH_SIZE: number = 100
// const batches: EmbeddingResult[] = []
// for (let i: number = 0; i < data.length; i += BATCH_SIZE) {
//   batches.push(data.slice(i, i + BATCH_SIZE))
// }

// Process each batch
// for (const batch of batches) {
// console.log('batch:', batch)

// const vectors: { id: string; values: number[] }[] = batch.map((item: EmbeddingResult) => ({
//   id: item.id,
//   values: item.values,
