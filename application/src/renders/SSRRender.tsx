import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticHandlerContext, StaticRouterProvider } from 'react-router'

import { RouteCommonProps } from '@/types'
import { isMatchRoute } from '@/utils'

import { Root, RootProps } from './Root'
import { assetPrefix } from '@/constants/env'

export interface SSRRenderProps extends RouteCommonProps, RootProps {}

/**
 * 官方推荐的ssr渲染方式
 */

export async function renderHTMLByRequest(props: SSRRenderProps & { fetchRequest: Request }) {
  const { fetchRequest, helmetContext } = props

  try {
    const { routes } = await import('../routes/routes')
    const handler = createStaticHandler(routes, { basename: assetPrefix })
    const context = (await handler.query(fetchRequest)) as StaticHandlerContext
    const router = createStaticRouter(handler.dataRoutes, context)

    return renderToString(
      <Root helmetContext={helmetContext} isSSR>
        <StaticRouterProvider router={router} context={context}></StaticRouterProvider>
      </Root>
    )
  } catch (error) {
    console.error('服务端渲染失败', error)
    return ''
  }
}

export { isMatchRoute }
