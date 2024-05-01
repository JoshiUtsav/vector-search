import express, { Request, Response } from 'express'
import http from 'http'
import { PORT, CSV_FILE_PATH, JSON_FILE_PATH, RAW_TEXT } from './config'
import multer from 'multer'
import path from 'path'
import { initializeConversionAndEmbedding } from './common/utils'

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

initializeConversionAndEmbedding(CSV_FILE_PATH, JSON_FILE_PATH, RAW_TEXT )

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
