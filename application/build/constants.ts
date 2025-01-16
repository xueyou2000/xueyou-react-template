import { join } from 'node:path'

// 包信息
const { npm_package_version } = process.env
export const VERSION = `${npm_package_version}`
export const VERSION_TIME = `${npm_package_version}@${Date.now()}`

// 构建配置
export const MANIFEST_NAME = 'webmanifest.json'
export const BUILD_MANIFEST_NAME = 'rsbuild-manifest.json'
export const SSR_RENDER_FILE = join(__dirname, '../src/renders/SSRRender.tsx')
export const CLIENT_ASSET_PREFIX = process.env.CLIENT_ASSET_PREFIX || '/'
