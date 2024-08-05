// Read and write in count file to check on the data is added or not

import fs from 'fs'
import { FilePath } from '../config'
class Watcher {
  async watch(last_index: string, csvlength: number) {
    if (!fs.existsSync(FilePath.COUNT_FILE_PATH)) {
      fs.writeFileSync(FilePath.COUNT_FILE_PATH, '0')
      console.log('File created successfully')
    }

    // Gonna Write last index number in count file
    // const write_number = fs.writeFileSync(FilePath.COUNT_FILE_PATH, `${last_index}`)

    // Gonna Read last index number in count file
    const read_number = fs.readFileSync(FilePath.COUNT_FILE_PATH)
    for (let i = Number(read_number.toString()); i < csvlength; i++) {
      console.log(i)

      fs.writeFileSync(FilePath.COUNT_FILE_PATH, `${i}`)
    }
  }
}

export default Watcher
