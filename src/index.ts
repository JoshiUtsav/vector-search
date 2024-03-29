import express, { Request, Response } from 'express'
import http from 'http'
import { PORT } from './config/index'
import multer from 'multer'
import path from 'path'

const app = express()
const server = http.createServer(app)

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static(path.resolve(__dirname, 'public')))

app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
  res.status(500).send(`Internal Server Error: ${err.message}`)
})

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
