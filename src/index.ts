import express, { Request, Response } from 'express'
import http from 'http'
import { PORT, InputfilePath, OutputfilePath } from './config'
import multer from 'multer'
import path from 'path'
import { convertCsvToJson, generateTextEmbedding } from './lib/Index'

const app = express()
const server = http.createServer(app)

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static(path.resolve(__dirname, 'public')))

app.use((error: Error, req: Request, res: Response, next: Function) => {
  res.status(500).send(`Internal Server Error: ${error.message}`)
})

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(200)
})

// Refactored to async/await for readability
async function initialize() {
  try {
    await convertCsvToJson(InputfilePath, OutputfilePath)
    console.log('CSV to JSON conversion complete')

    const inputText = 'Hello My Name is Utsav'
    await generateTextEmbedding(inputText)
    console.log('User Query Text Embeddings created successfully')
  } catch (error) {
    console.error('Initialization error:', error)
  }
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  initialize()
})
