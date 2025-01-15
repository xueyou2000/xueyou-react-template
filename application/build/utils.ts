import type { RsbuildPlugin } from '@rsbuild/core'
import { consola } from 'consola'
import { rename, readFile, writeFile, mkdir, rm, access, constants } from 'node:fs/promises'
import { join, normalize, resolve, relative, dirname } from 'node:path'

import { ManifestJson } from './ssr/types'

// 包信息
const { npm_package_version } = process.env
export const VERSION = `${npm_package_version}`
export const VERSION_TIME = `${npm_package_version}@${Date.now()}`

// 构建配置
export const MANIFEST_NAME = 'webmanifest.json'
export const BUILD_MANIFEST_NAME = 'rsbuild-manifest.json'
export const SSR_RENDER_FILE = join(__dirname, '../src/renders/SSRRender.tsx')
export const CLIENT_ASSET_PREFIX = process.env.CLIENT_ASSET_PREFIX || '/'

export async function readFileJson<T extends object>(filePath: string): Promise<T> {
  try {
    const manifestContent = await readFile(normalize(filePath), 'utf-8')
    return JSON.parse(manifestContent)
  } catch {
    console.error('Failed to read json file')
    return {} as T
  }
}

export type SourceMapOptions = {
  sourceMapDist?: string
}

/**
 * sourcemap插件
 * todo: 后续集成sourcemap到服务器上传, 思考 assetPrefix 如果为 https://cnd 路径时如何处理
 * @description 为web环境开启sourcemap配置, 并将sourcemap输出到指定目录
 * @param options
 * @returns
 */
export const pluginSourceMap = (options: SourceMapOptions = {}): RsbuildPlugin => ({
  name: 'xueyou:sourcemap-plugin',
  setup(api) {
    api.modifyEnvironmentConfig((config, { name, mergeEnvironmentConfig }) => {
      if (name !== 'web') {
        return config
      }
      return mergeEnvironmentConfig(config, {
        output: {
          sourceMap: true,
          manifest: config?.output?.manifest || true
        }
      })
    })

    api.onAfterBuild(async () => {
      const config = api.getNormalizedConfig({ environment: 'web' })
      if (!config.output.manifest) {
        consola.warn('manifest is disabled, sourcemap plugin will not work.')
        return
      }
      const distPath = normalize(api.context.distPath)
      const manifest = config.output.manifest
      const manifestName = typeof manifest === 'string' ? manifest : 'manifest.json'

      const json = await readFileJson<ManifestJson>(join(distPath, manifestName))
      const allFiles = json?.allFiles || []

      // 默认目标路径
      const sourceMapDist = options.sourceMapDist ? resolve(options.sourceMapDist) : distPath

      const assetPrefix = config.output.assetPrefix || '/'

      // 移除service-worker map
      const workerMap = join(distPath, 'service-worker.js.map')
      try {
        await access(workerMap, constants.F_OK)
        await rm(join(distPath, 'service-worker.js.map'))
      } catch {
        console.log('service-worker.js.map not found')
      }

      // 处理 .map 文件
      for (const fileRelativePath of allFiles) {
        if (fileRelativePath.endsWith('.map')) {
          const file = fileRelativePath.replace(assetPrefix, '/')

          // 获取原始文件名
          const originalFile = file.replace('.map', '')

          // 原始文件路径
          const originalFilePath = join(distPath, originalFile)
          // 修改后的map文件路径
          const sourceMapPath = join(sourceMapDist, file)

          // 移动 .map 文件到目标目录
          await mkdir(dirname(sourceMapPath), { recursive: true })
          await rename(join(distPath, file), sourceMapPath)

          // 修改原始文件内容
          const originalContent = await readFile(originalFilePath, 'utf-8')
          // //# sourceMappingURL=index.f79148e7.js.map => //# sourceMappingURL=/sourceMapDist/index.f79148e7.js.map
          const updatedContent = originalContent.replace(
            /# sourceMappingURL=.+\.map/,
            `# sourceMappingURL=${relative(dirname(originalFilePath), sourceMapPath)}`
          )

          // 保存修改后的原始文件
          await writeFile(originalFilePath, updatedContent, 'utf-8')
        }
      }
    })
  }
})
