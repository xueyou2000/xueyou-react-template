import { StrictMode, Suspense, useLayoutEffect } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { Theme } from '@radix-ui/themes'

import { assetPrefix } from '@/constants/env'
import { routes } from '@/routes/routes'
import { useAppContext } from '@/context/AppContext'
import { LoadingFallback } from '@/components/LoadingFallback'

import '@radix-ui/themes/styles.css'
import '@/assets/styles/reset.scss'
import '@/assets/styles/themes/index.scss'

export function App() {
  const router = createBrowserRouter(routes, { basename: `${assetPrefix}` })
  const { theme, initializeTheme } = useAppContext()

  // 只在 App 挂载时初始化一次
  useLayoutEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  return (
    <StrictMode>
      <Theme appearance={theme}>
        <Suspense fallback={<LoadingFallback text="页面加载中..." />}>
          <RouterProvider router={router} />
        </Suspense>
      </Theme>
    </StrictMode>
  )
}
