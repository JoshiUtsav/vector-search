import express, { Request, Response } from 'express'
import http from 'http'
import { PORT, CSV_FILE_PATH, JSON_FILE_PATH } from './config'
import path from 'path'
import { generateTextEmbedding, batchUpsertData } from './lib/Index'
import { PINECONE_API_KEY } from './config/index'
import { initializeConversionAndEmbeddingGeneration } from './lib/Initialize'
import type { EmbeddingResult, IndexInfo, IndexList } from './types/index.d'
import { searchQuery } from './lib/database'

const app = express()
const server = http.createServer(app)

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static(path.resolve(__dirname, 'public')))

app.use((error: Error, req: Request, res: Response, next: Function) => {
  res.status(500).send(`Internal Server Error: ${error.message}`)
})

app.get('/', (req : Request, res: Response) => {
  res.sendStatus(200)
})

app.post('/query', async (req, res) => {
  try {
    const { query } = req.body
    const matchResults = await searchQuery(query)
    return res.json({ matches: matchResults })
  } catch (error) {
    console.error('Error processing query:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

initializeConversionAndEmbeddingGeneration(CSV_FILE_PATH, JSON_FILE_PATH).catch(console.error)

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
