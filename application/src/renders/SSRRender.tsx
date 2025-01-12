import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticHandlerContext, StaticRouterProvider } from 'react-router'

import { RouteCommonProps } from '@/types'
import { isMatchRoute, matchBestRoute } from '@/utils'

import { Root, RootProps } from './Root'
import { assetPrefix } from '@/constants/env'

import { BUILD_MANIFEST_NAME } from '../../build/utils'

export interface SSRRenderProps extends RouteCommonProps, RootProps {}

/**
 * 官方推荐的ssr渲染方式
 */

export async function renderHTMLByRequest(
  props: SSRRenderProps & { fetchRequest: Request }
): Promise<{ html: string; preCssUrl?: string }> {
  const { fetchRequest, helmetContext, url } = props

  try {
    const { routes } = await import('../routes/routes')

    const matchRoute = matchBestRoute(routes, url)
    const handler = createStaticHandler(routes, { basename: assetPrefix })
    const context = (await handler.query(fetchRequest)) as StaticHandlerContext
    const router = createStaticRouter(handler.dataRoutes, context)

    // 获取 manifestJson
    const host = fetchRequest.headers.get('host')
    const manifest = await fetch(`http://${host}${assetPrefix}${BUILD_MANIFEST_NAME}`)
    const manifestJson = await manifest.json()
    const allFiles: string[] = manifestJson.allFiles || []
    // 从manifestJson中匹配出对应的 matchRoute?.route?.chunkName.css文件
    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp(`\/${matchRoute?.route?.chunkName}(?:\\.[a-zA-Z0-9]+)?\\.css$`)
    const preCssUrl = allFiles.find((file: string) => regex.test(file))

    const html = renderToString(
      <Root helmetContext={helmetContext} isSSR>
        <StaticRouterProvider router={router} context={context}></StaticRouterProvider>
      </Root>
    )

    return { html, preCssUrl }
  } catch (error) {
    console.error('服务端渲染失败', error)
    return { html: '', preCssUrl: '' }
  }
}

export { isMatchRoute }
