import { consola } from 'consola'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { __dirname, getProdManifestJson, require, serverRender } from './ssr-base'

import { CLIENT_ASSET_PREFIX } from '../constants'
import { SSRRenderModuleType, SSRRenderOptions } from './types'

const distDir = join(__dirname, '../../dist')

export async function ssrRender() {
  const moduleUrl = join(distDir, 'server/index.js')
  const SSRRenderModule: SSRRenderModuleType = require(moduleUrl)
  const htmlTemplate = await readFile(join(distDir, 'index.html'), 'utf-8')
  const manifest = await getProdManifestJson(distDir)

  const paths = await SSRRenderModule.getRoutePaths()

  consola.info('开始批量构建: ', paths)

  await Promise.all(
    paths.map(async (pathname) => {
      const html = await build(pathname, SSRRenderModule, {
        getHtmlTemplate: async () => htmlTemplate,
        manifest
      })
      if (!html) {
        consola.error(`服务端渲染失败: pathname=${pathname}`)
        return
      }
      consola.success(`写入构建HTML: ${pathname}`)
      const filename = pathname === '/' ? 'index' : pathname
      await writeFile(join(distDir, `${filename}.html`), html)
    })
  )

  consola.success('批量构建完成')
}

async function build(pathname: string, SSRRenderModule: SSRRenderModuleType, options: SSRRenderOptions) {
  consola.info('开始构建: ', pathname)

  const origin = `http://localhost:3000${CLIENT_ASSET_PREFIX.replace(/\/$/, '')}`
  const fetchRequest = new Request(`${origin}/${pathname.replace(/^\//, '')}`, {
    method: 'GET'
  })
  try {
    const html = await serverRender(fetchRequest, SSRRenderModule, options)
    return html
  } catch (error) {
    consola.error(`服务端渲染失败: pathname=${pathname}`, error)
    return ''
  }
}

ssrRender()
