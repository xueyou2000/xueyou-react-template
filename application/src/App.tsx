import { StrictMode, Suspense, useLayoutEffect } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { assetPrefix } from '@/constants/env'
import { routes } from '@/routes/routes'
import { useAppContext } from '@/context/AppContext'
import { LoadingFallback } from '@/components/LoadingFallback'

import '@/assets/styles/reset.scss'
import '@/assets/styles/themes/index.scss'

export function App() {
  const router = createBrowserRouter(routes, { basename: `${assetPrefix}` })
  const { initializeTheme } = useAppContext()

  // 只在 App 挂载时初始化一次
  useLayoutEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  return (
    <StrictMode>
      <Suspense fallback={<LoadingFallback text='页面加载中...' />}>
        <RouterProvider router={router} />
      </Suspense>
    </StrictMode>
  )
}
