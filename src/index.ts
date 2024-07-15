import express, { Application, Request, Response, NextFunction } from 'express'
import http, { Server } from 'http'
import { PORT, FilePath } from './config'
import path from 'path'
import { generateTextEmbedding, batchUpsertData } from './lib/Index'
import { PINECONE_API_KEY } from './config/index'
import Converter from './lib/converter'
import cors from "cors"
import { ConversionAndEmbeddingService } from './lib/Initialize'
import type { EmbeddingResult, IndexInfo, IndexList } from './types/index.d'

class AppServer {
  private app: Application
  private server: Server

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.initializeMiddleware()
    this.initializeRoutes()
    this.initializeErrorHandling()
    this.initialize()
  }

  private initializeMiddleware() {
    this.app.use(express.json({ limit: '16kb' }))
    this.app.use(express.urlencoded({ extended: true, limit: '16kb' }))
    this.app.use(express.static(path.resolve(__dirname, 'public')))
    this.app.use(cors())
  }

  private initializeRoutes() {
    this.app.get('/', this.handleRoot)
    this.app.post('/api', this.handleEmbedding)
  }

  private initializeErrorHandling() {
    this.app.use(this.handleError)
  }

  private async initialize() {
    try {
      const { CSV_FILE_PATH, JSON_FILE_PATH, JSON_WRITE_PATH } = FilePath
      const convert = new Converter(CSV_FILE_PATH, JSON_FILE_PATH, JSON_WRITE_PATH)
      const service = new ConversionAndEmbeddingService(
        CSV_FILE_PATH,
        JSON_FILE_PATH,
        JSON_WRITE_PATH,
      )
      service.initializeConversionAndEmbeddingGeneration().catch(console.error)
    } catch (error) {
      console.error('Error during initialization:', error)
    }
  }

  private handleRoot(req: Request, res: Response) {  
    res.status(200).send('Ok')
  }

  private async handleEmbedding(req: Request, res: Response) {
    try {
      const { text } = req.body
      if (!text) {
        return res.status(400).json({ error: 'Text is required' })
      }
      const embedding = await generateTextEmbedding(text)
      res.status(200).json({ embedding })
    } catch (error: any) {
      console.error(error)
      res.status(500).json({ error: 'Failed to generate embedding', details: error.message })
    }
  }

  private handleError(error: Error, req: Request, res: Response, _next: NextFunction) {
    res.status(500).send(`Internal Server Error: ${error.message}`)
  }


  public start() {
    this.server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  }
}

const appServer = new AppServer()
appServer.start()
