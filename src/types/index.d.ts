export interface EmbeddingResult {
  id: string
  values: number[]
}

export interface IndexInfo {
  name: string
  dimension: number
  metric: string
  host: string
  spec: {
    pod?: any
    serverless: {
      cloud: string
      region: string
    }
  }
  status: {
    ready: boolean
    state: string
  }
}

export interface IndexList {
  indexes: IndexInfo[]
}

export interface DataObject {
  Title: string
  Industry: string
  State: string
  City: string
}
