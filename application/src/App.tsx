import { StrictMode, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { assetPrefix } from '@/constants/env'
import { routes } from './routes/routes'

import '@/assets/styles/themes/index.scss'

export function App() {
  const router = createBrowserRouter(routes, { basename: `${assetPrefix}` })
  return (
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </StrictMode>
  )
}
