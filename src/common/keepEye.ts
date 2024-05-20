const fs = require('fs')
const csvtojson = require('csvtojson')
const path = require('path')
import { CSV_FILE_PATH, JSON_FILE_PATH } from '../config/index'
import { convertCsvToJson } from "../lib/Index"

// Function to watch for file changes
function watchFileChanges(csvPath: string, jsonPath: string, interval = 1000) {
  let csvLastModified = fs.statSync(csvPath).mtimeMs
  let jsonLastModified = fs.statSync(jsonPath).mtimeMs

  setInterval(() => {
    const csvStats = fs.statSync(csvPath)
    const jsonStats = fs.statSync(jsonPath)

    if (csvStats.mtimeMs > csvLastModified) {
      convertCsvToJson(csvPath, jsonPath)
      csvLastModified = csvStats.mtimeMs
    }
  }, interval)
}

// Example usage:
const csvPath = CSV_FILE_PATH
const jsonPath = JSON_FILE_PATH

watchFileChanges(csvPath, jsonPath)
