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
  Id: string
  Title: string
  Industry: string
  State: string
  City: string
}

export interface CSV {
  Id: string
  'First Name'?: string
  'Last Name'?: string
  Title?: string
  Company?: string
  'Company Name for Emails'?: string
  Email?: string
  'Email Status'?: string
  Seniority?: string
  'Mobile Phone'?: string
  'Corporate Phone'?: string
  'Other Phone'?: string
  Stage?: string
  '# Employees'?: string
  Industry?: string
  Keywords?: string
  'Person Linkedin Url'?: string
  Website?: string
  'Company Linkedin Url'?: string
  'Facebook Url'?: string
  'Twitter Url'?: string
  City?: string
  State?: string
  Country?: string
  'Company Address'?: string
  'Company City'?: string
  'Company State'?: string
  'Company Country'?: string
  'Company Phone'?: string
  'SEO Description'?: string
  Technologies?: string
  'Annual Revenue'?: string
  'Total Funding'?: string
  'Latest Funding'?: string
  'Latest Funding Amount'?: string
  'Last Raised At'?: string
  'Email Sent'?: string
  'Email Open'?: string
  'Email Bounced'?: string
  Replied?: string
  Demoed?: string
  'Number of Retail Locations'?: string
  'Apollo Contact Id'?: string
  'Apollo Account Id'?: string
}

export interface Convert {
  convertCsvToJson: () => Promise<EmbeddingResult[]>
}
