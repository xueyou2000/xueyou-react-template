import { assetPrefix } from '@/constants/env'
import { RouteCommonProps } from '@/types'
import { matchRoutes, RouteObject, RouteMatch } from 'react-router'

/**
 * 路由是否匹配
 * @description 用于本地服务器根据路径判断是否服务端渲染，或者仅仅返回静态文件
 */
export async function isMatchRoute(props: RouteCommonProps) {
  const { url } = props
  try {
    if (url === '/manifest.json') {
      return false
    }

    const { routes } = await import('../../routes/routes')
    const matchRouteList = matchRoutes(routes, url, assetPrefix)?.filter((m) => m.route.path !== '*')

    return !!matchRouteList?.length
  } catch {
    return false
  }
}

/**
 * 预加载lazy路由
 * @description 此步骤非常重要, 不过没有此步骤，那么会保留服务端渲染的内容，客户端会又渲染一份dom!!!
 */
export async function fixLazyRoutes(routes: RouteObject[]) {
  // 确定是否有任何初始路由是惰性的
  const lazyMatches = matchRoutes(routes, window.location.pathname, assetPrefix)

  // 递归加载惰性路由
  const preloadLazyRoutes = async (route: RouteObject) => {
    if (route.lazy) {
      const routeModule = await route.lazy!()
      Object.assign(route, { ...routeModule, lazy: undefined })
    }
    // if (route.children) {
    //   await Promise.all(route.children.map(preloadLazyRoutes))
    // }
  }

  // 在创建路由器之前加载惰性匹配并更新路由
  if (lazyMatches && lazyMatches.length > 0) {
    await Promise.all(lazyMatches.map((m) => preloadLazyRoutes(m.route)))
  }

  return routes
}

/**
 * 匹配最终路由
 * 原始matchRoutes方法会返回多个，包含父路由
 */
export function matchBestRoute(routes: RouteObject[], url: string): RouteMatch<string, RouteObject> | null {
  const matchRouteList = matchRoutes(routes, url, assetPrefix)
  return matchRouteList?.length ? matchRouteList[matchRouteList.length - 1] : null
}
