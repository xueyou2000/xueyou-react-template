const { npm_package_version } = process.env
import { join } from 'node:path'

export const VERSION = `${npm_package_version}`
export const VERSION_TIME = `${npm_package_version}@${Date.now()}`

export const MANIFEST_NAME = 'manifest.json'

export const SSR_RENDER_FILE = join(__dirname, '../src/renders/SSRRender.tsx')
