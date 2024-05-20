import express, { Request, Response } from 'express'
import http from 'http'
import { PORT, CSV_FILE_PATH, JSON_FILE_PATH } from './config'
import path from 'path'
import { generateTextEmbedding } from './lib/Index'
import { Pinecone } from '@pinecone-database/pinecone'
import { PINECONE_API_KEY } from './config/index'
import { initializeConversionAndEmbeddingGeneration } from './lib/Initialize'
import type { EmbeddingResult, IndexInfo, IndexList } from './types/index.d'

const app = express()
const server = http.createServer(app)
const pc = new Pinecone({
  apiKey: PINECONE_API_KEY,
})

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static(path.resolve(__dirname, 'public')))

app.use((error: Error, req: Request, res: Response, next: Function) => {
  res.status(500).send(`Internal Server Error: ${error.message}`)
})

// Database
const indexName = 'example-index'
const namespace = 'example-namespace'
const index = pc.Index(indexName)

const BATCH_SIZE = 100

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

// createIndex()

export async function batchUpsertData(data: EmbeddingResult[]) {
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
      console.log("data ready to upsert", vectors);
      
      await index.upsert(vectors)
      console.log(`Upserted batch of ${batch.length} vectors`)
    } catch (error) {
      console.error('Error upserting batch:', error)
    }
  }
}

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(200)
})

app.post('/query', async (req, res) => {
  try {
    const { query } = req.body
    console.log("query from user", query);
    
    const matchResults = await searchQuery(query)

    return res.json({ matches: matchResults })
  } catch (error) {
    console.error('Error processing query:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

async function searchQuery(query: string): Promise<EmbeddingResult[]> {
  if (!query) {
    throw new Error('Query values must be a string')
  }
  const genEmbedding = await generateTextEmbedding(query.toString())

  console.log("Query Embeddings", genEmbedding);
  

  console.log('Generated Query Embedding:', genEmbedding)
  const response = await index.namespace(namespace).query({
    topK: 10,
    vector: genEmbedding,
    includeValues: true,
  })

  return response.matches
}

export async function fetchData() {
  const fetchResult = await index.fetch(['0'])
  return fetchResult
}

initializeConversionAndEmbeddingGeneration(CSV_FILE_PATH, JSON_FILE_PATH).catch(console.error)

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
