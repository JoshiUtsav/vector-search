import * as fs from 'fs'
import * as path from 'path'
import { FilePath } from '../config/index'
import { Converter } from '../lib/Index'

class FileWatcher extends Converter {
  private interval: number
  private csvLastModified: number
  private jsonLastModified: number
  private intervalId: NodeJS.Timeout | null

  constructor(CSV_FILE_PATH: string, JSON_FILE_PATH: string, interval = 1000) {
    super(CSV_FILE_PATH, JSON_FILE_PATH)
    this.interval = interval  
    this.csvLastModified = fs.statSync(this.CSV_FILE_PATH).mtimeMs
    this.jsonLastModified = fs.statSync(this.JSON_FILE_PATH).mtimeMs
    this.intervalId = null
  }

  public startWatching() {
    this.intervalId = setInterval(() => {
      const csvStats = fs.statSync(this.CSV_FILE_PATH)
      const jsonStats = fs.statSync(this.JSON_FILE_PATH)
      if (csvStats.mtimeMs > this.csvLastModified) {
        this.convertCsvToJson(this.CSV_FILE_PATH, this.JSON_FILE_PATH)
        this.csvLastModified = csvStats.mtimeMs
      }
    }, this.interval)
  }

  public stopWatching() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
