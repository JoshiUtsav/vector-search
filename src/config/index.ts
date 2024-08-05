import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import { Pinecone } from '@pinecone-database/pinecone'
import { OpenAI } from 'openai'

export const PORT = process.env.PORT || 3000
export const DATABASE_URL = process.env.MONGO_URL || 'mongodb://localhost:27017' // Add your own MongoDB URI here
export const DB_NAME = process.env.DB_NAME || 'vector-search' // Add your own database name

// Pinecone setup configuration
export const PINECONE_API_KEY = process.env.PINECONE_API_KEY || 'add you own api key' // Add your own Pinecone secret key
export const pc = new Pinecone({
  apiKey: PINECONE_API_KEY,
})

// OpenAI setup configuration
export const OPENAI_SECRET_KEY: string = process.env.OPENAI_SECRET_KEY || 'add you own api key' // Add your own OpenAI secret key
export const openai = new OpenAI({
  apiKey: OPENAI_SECRET_KEY,
})

export const FilePath = {
  CSV_FILE_PATH: path.resolve(__dirname, '../../public/demo.csv'),
  JSON_FILE_PATH: path.resolve(__dirname, '../../public/demo.json'),
  COUNT_FILE_PATH: path.resolve(__dirname, '../../public/count.txt'),
} as const
