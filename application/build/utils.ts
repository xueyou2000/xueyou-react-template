const { npm_package_version } = process.env
import { join } from 'node:path'

export const VERSION = `${npm_package_version}`
export const VERSION_TIME = `${npm_package_version}@${Date.now()}`

export const MANIFEST_NAME = 'webmanifest.json'
export const BUILD_MANIFEST_NAME = 'rsbuild-manifest.json'

export const SSR_RENDER_FILE = join(__dirname, '../src/renders/SSRRender.tsx')

export const CLIENT_ASSET_PREFIX = process.env.CLIENT_ASSET_PREFIX || '/'
