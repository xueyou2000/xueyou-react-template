import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { consola } from 'consola'
import type { Request as ExpressRequest, Response, NextFunction } from 'express'
import type { HelmetData, HelmetServerState } from 'react-helmet-async'

import { GetHtmlTemplate, SSRRenderModuleType } from './types'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

// cjs的require, EsModule只支持import.meta, 不支持require
export const require = createRequire(import.meta.url)

/**
 * 服务端渲染
 * @param request 请求
 * @param SSRRenderModule 服务端渲染模块
 * @param  getHtmlTemplate 获取html模板内容和(只有匹配路由成功才会调用，避免处理了其他静态资源而导致报错)
 * @returns 服务端渲染内容
 */
export async function serverRender(fetchRequest: Request, SSRRenderModule: SSRRenderModuleType, getHtmlTemplate: GetHtmlTemplate) {
  const helmetContext: HelmetData['context'] = { helmet: {} as HelmetServerState }
  const { pathname } = new URL(fetchRequest.url)
  const props = { url: pathname, helmetContext }
  const isMatch = await SSRRenderModule.isMatchRoute(props)

  if (isMatch) {
    const htmlContent = await SSRRenderModule.renderHTMLByRequest({ ...props, fetchRequest })
    const helmet = helmetContext.helmet
    const htmlTemplate = await getHtmlTemplate()
    const html = htmlTemplate
      .replace('<!--app-content-->', htmlContent)
      .replace('<!--helmet.title-->', helmet?.title?.toString() || '')
      .replace('<!--helmet.priority-->', helmet?.priority?.toString() || '')
      .replace('<!--helmet.meta-->', helmet?.meta?.toString() || '')
      .replace('<!--helmet.link-->', helmet?.link?.toString() || '')
      .replace('<!--helmet.script-->', helmet?.script?.toString() || '')
      .replace('data-helmet-html-attributes', helmet?.htmlAttributes?.toString() || '')
    return html
  } else {
    return ''
  }
}

/**
 * 服务端渲染
 * @param request 请求
 * @param response 响应
 * @param next 中间件下一步
 * @param SSRRenderModule 服务端渲染模块
 * @param getHtmlTemplate 获取html模板内容和(只有匹配路由成功才会调用，避免处理了其他静态资源而导致报错)
 */
export async function serverRenderExpress(
  request: ExpressRequest,
  response: Response,
  next: NextFunction,
  SSRRenderModule: SSRRenderModuleType,
  getHtmlTemplate: GetHtmlTemplate
) {
  const fetchRequest = createFetchRequest(request)

  // SSRRenderModule, htmlTemplate
  const html = await serverRender(fetchRequest, SSRRenderModule, getHtmlTemplate)
  if (html) {
    const pathname = request.url
    consola.success(`服务端渲染成功: pathname=${pathname}`)
    response.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } else {
    next()
  }
}

/**
 * 创建fetchRequest, react-router-dom/server中需要
 * @returns fetchRequest
 */
export function createFetchRequest(req: ExpressRequest) {
  const origin = `${req.protocol}://${req.get('host')}`
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}
