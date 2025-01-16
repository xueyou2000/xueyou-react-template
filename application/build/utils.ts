import { readFile } from 'node:fs/promises'
import { normalize } from 'node:path'

export async function readFileJson<T extends object>(filePath: string): Promise<T> {
  try {
    const manifestContent = await readFile(normalize(filePath), 'utf-8')
    return JSON.parse(manifestContent)
  } catch {
    console.error('Failed to read json file')
    return {} as T
  }
}
