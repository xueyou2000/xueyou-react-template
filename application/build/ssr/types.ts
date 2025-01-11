import { RsbuildInstance } from '@rsbuild/core'
import type { SSRRenderProps } from '../../src/renders/SSRRender'
import type { RouteCommonProps } from '../../src/types'

export type GetHtmlTemplate = () => Promise<string>

export type RsbuildDevServer = Awaited<ReturnType<RsbuildInstance['createDevServer']>>

export interface SSRRenderModuleType {
  renderHTMLByRequest: (props: SSRRenderProps & { fetchRequest: Request }) => Promise<string>
  isMatchRoute: (props: RouteCommonProps) => Promise<boolean>
}
