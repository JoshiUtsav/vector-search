import fs from 'fs'
import { convertCsvToJson } from '../lib/Index'

/**
 * Sets up a watcher on a CSV file and converts it to JSON format upon any changes.
 *
 * This function watches for any changes to the specified CSV file. When a change is detected,
 * it triggers the conversion from CSV to JSON and saves the result to the given destination path.
 *
 * @param sourcePath The path to the source CSV file to watch.
 * @param destinationPath The path where the converted JSON file should be saved.
 */
function watchFileChange(sourcePath: string, destinationPath: string): void {
  const watcher = fs.watch(sourcePath, async (eventType) => {
    if (eventType === 'change') {
      try {
        await convertCsvToJson(sourcePath, destinationPath)
      } catch (error) {
        console.error('Failed:', error)
      }
    }
  })

  // Handle error event to prevent unhandled exceptions
  watcher.on('error', (error) => {
    console.error('Watcher error:', error)
  })

  // Log a message when watching starts
  console.log(`Watching for changes in ${sourcePath}...`)
}

export default watchFileChange
