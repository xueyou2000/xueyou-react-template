import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticHandlerContext, StaticRouterProvider } from 'react-router'

import { RouteCommonProps } from '@/types'
import { isMatchRoute, matchBestRoute, flattenRoutes } from '@/utils'

import { Root, RootProps } from './Root'
import { assetPrefix } from '@/constants/env'

export interface SSRRenderProps extends RouteCommonProps, RootProps {}

/**
 * 官方推荐的ssr渲染方式
 */

export async function renderHTMLByRequest(props: SSRRenderProps & { fetchRequest: Request }): Promise<string> {
  const { fetchRequest, helmetContext } = props

  try {
    const { routes } = await import('../routes')

    const handler = createStaticHandler(routes, { basename: assetPrefix })
    const context = (await handler.query(fetchRequest)) as StaticHandlerContext
    const router = createStaticRouter(handler.dataRoutes, context)

    const html = await renderHtmlPromise(
      <Root helmetContext={helmetContext} isSSR>
        <StaticRouterProvider router={router} context={context}></StaticRouterProvider>
      </Root>
    )

    return html
  } catch (error) {
    console.error('服务端渲染失败', error)
    return ''
  }
}

/**
 * 流式渲染内容, 传统的renderToString方法不能正常处理Suspense, lazy组件
 */
export function renderHtmlPromise(children: React.ReactNode) {
  return new Promise<string>((resolve, reject) => {
    let htmlChunkData = ''
    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        htmlChunkData += chunk.toString()
        callback()
      }
    })
    const stream = renderToPipeableStream(children, {
      onAllReady() {
        stream.pipe(writableStream)
      },
      onShellError(err) {
        reject(err)
      }
    })
    writableStream.on('finish', () => {
      resolve(htmlChunkData)
    })
    writableStream.on('error', reject)
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function matchPreCssUrl(pathname: string, manifestJson: any) {
  const { routes } = await import('../routes')
  const matchRoute = matchBestRoute(routes, pathname, assetPrefix)
  if (!matchRoute || !matchRoute.route?.chunkName) {
    return ''
  }
  return getPreCssUrl(manifestJson?.allFiles || [], matchRoute.route?.chunkName)
}

/**
 * 提取需要预加载的页面样式
 */
export function getPreCssUrl(allFiles: string[], chunkName: string) {
  if (!chunkName) {
    return ''
  }

  // 从manifestJson中匹配出对应的 matchRoute?.route?.chunkName.css文件
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(`\/${chunkName}(?:\\.[a-zA-Z0-9]+)?\\.css$`)
  return allFiles.find((file: string) => regex.test(file))
}

export async function getRoutePaths() {
  const { routes } = await import('../routes')
  return flattenRoutes(routes)
}

export { isMatchRoute }
