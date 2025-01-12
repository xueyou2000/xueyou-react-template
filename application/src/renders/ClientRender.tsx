import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router'

import { assetPrefix, isDevMode } from '@/constants/env'
import { fixLazyRoutes } from '@/utils'

import { Root } from './Root'
import { useAppContext } from '@/context/AppContext'

export async function setupClientApp(routes: RouteObject[]) {
  const container = document.getElementById('root')

  if (container) {
    // 获取root根节点内容
    const childNodes = container?.childNodes || []
    // 忽略ssr占位符注释, 判断是否有ssr预渲染内容，有则进行水合
    const isClientRender = childNodes?.length === 1 && childNodes[0]?.nodeType === 8

    if (!isClientRender) {
      // 服务端水合渲染需处理lazy路由, 注意此处是异步的，必须要加载完成。否则水合时谁有2份一样的dom
      routes = await fixLazyRoutes(routes, assetPrefix)
    }
    const router = createBrowserRouter(routes, { basename: `${assetPrefix}` })
    const rootElement = (
      <Root>
        <RouterProvider router={router} />
      </Root>
    )

    useAppContext.setState({ isHydrated: !isClientRender })

    if (isClientRender) {
      // 纯客户端渲染
      const root = createRoot(container)
      root.render(rootElement)
    } else {
      // 水合渲染
      hydrateRoot(container, rootElement, {
        onRecoverableError(error, errorInfo) {
          if (isDevMode) {
            console.log('hydrate failed', errorInfo)
            console.error(error)
          }
        }
      })
    }
  }
}
