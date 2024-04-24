import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3000
export const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/' // Add your own MongoDB URI here
export const DB_NAME = process.env.DB_NAME || 'vector-search'
export const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY || 'add you own api key'
export const PINECONE_API_KEY = process.env.PINECONE_API_KEY || 'add you own api key'
export const CSV_FILE_PATH = 'public/data.csv'
export const JSON_FILE_PATH = 'public/data.json'
export const RAW_TEXT = 'My name is utsav joshi'
export const JSONS = [
  {
    name: 'Utsav Joshi',
    ghar: 'Tilak Nagar',
  },
  {
    name: 'John Joshi',
    ghar: 'Abroad',
  },
]
