function memoize(func: Function): Function {
  const cache: { [key: string]: any } = {}

  return async function (...args: any[]) {
    const key = JSON.stringify(args)
    if (cache[key]) {
      return cache[key]
    } else {
      const result = await func(...args)
      cache[key] = result
      return result
    }
  }
}
/**
 * Memoization function for caching extracted details from JSON files.
 */
export function memoizeExtractDetails(
  func: (jsonFilePath: string) => Promise<any[]>,
): (jsonFilePath: string) => Promise<any[]> {
  const extractDetailsCache: { [filePath: string]: any } = {}

  return async function (jsonFilePath: string) {
    // Check if the result is already memoized
    if (extractDetailsCache[jsonFilePath]) {
      return extractDetailsCache[jsonFilePath]
    } else {
      // Compute and cache the result
      const result = await func(jsonFilePath)
      extractDetailsCache[jsonFilePath] = result
      return result
    }
  }
}
