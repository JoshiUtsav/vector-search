import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

export const PORT = process.env.PORT || 3000
export const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/' // Add your own MongoDB URI here
export const DB_NAME = process.env.DB_NAME || 'vector-search'
export const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY || 'add you own api key'
export const PINECONE_API_KEY = process.env.PINECONE_API_KEY || 'add you own api key'
export const CSV_FILE_PATH = path.resolve(__dirname, '../../public/data.csv')
export const JSON_FILE_PATH = path.resolve(__dirname, '../../public/data.json')
export const JSON_FILE_PATH_EMBEDDED = path.resolve(__dirname, '../../public/vectorData.json')
