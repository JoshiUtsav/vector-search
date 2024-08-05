import { Request, Response } from 'express'
import { OpenAIService } from './lib/Index'
import { QueryData } from './lib/database'

class Routes {
  async index(req: Request, res: Response) {
    res.status(200).send('Ok')
  }

  async handleRequest(req: Request, res: Response) {
    try {
      const { text } = req.body
      if (!text) {
        return res.status(400).json({ error: 'Text is required' })
      }

      const openai = new OpenAIService()
      const response = await openai.generateEmbedding(text)

      const result = await QueryData(response)      
      

      res.status(200).json({ Text: result })
    } catch (error: any) {
      console.error(error)
      res.status(500).json({ error: 'Failed to generate embedding', details: error.message })
    }
  }
}

export default new Routes()
