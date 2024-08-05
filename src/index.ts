import express, { Application, Request, Response, NextFunction } from 'express'
import http, { Server } from 'http'
import { PORT, FilePath } from './config'
import path from 'path'
import cors from 'cors'
import { InitializationService } from './lib/Initialize'
import Postgres_connection, { createIndex } from './lib/database'
import Routes from './response'

class AppServer {
  private app: Application
  private server: Server

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.initializeMiddleware()
    this.initializeRoutes()
    this.initializeErrorHandling()
    this.Database_Connections()
    this.initialize()
  }

  private initializeMiddleware() {
    this.app.use(express.json({ limit: '16kb' }))
    this.app.use(express.urlencoded({ extended: true, limit: '16kb' }))
    this.app.use(express.static(path.resolve(__dirname, 'public')))
    this.app.use(cors())
  }

  private initializeRoutes() {
    this.app.get('/', (req: Request, res: Response) => {
      Routes.index(req, res)
    })
    this.app.post('/api', (req: Request, res: Response) => {
      Routes.handleRequest(req, res)
    })
  }

  private initializeErrorHandling() {
    this.app.use(this.handleError)
  }

  private async initialize() {
    const Initialize = new InitializationService(FilePath.CSV_FILE_PATH, FilePath.JSON_FILE_PATH)
    await Initialize.initializeApplication()
  }

  private async Database_Connections() {
    await createIndex()
    await Postgres_connection()
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
