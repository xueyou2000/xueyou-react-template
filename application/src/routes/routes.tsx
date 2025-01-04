import { RouteObject } from 'react-router'

import { DefaultHydrateFallback, ErrorBoundary } from '@/components'

export const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    HydrateFallback: DefaultHydrateFallback,
    children: [
      {
        index: true,
        lazy: () => import(/* webpackChunkName: "indexpage" */ '../pages/Index')
      },
      {
        path: 'home',
        lazy: () => import(/* webpackChunkName: "home" */ '../pages/Home')
      },
      {
        path: 'about',
        children: [
          {
            index: true,
            lazy: () => import(/* webpackChunkName: "about" */ '../pages/About')
          },
          {
            path: ':id',
            lazy: () => import(/* webpackChunkName: "about" */ '../pages/About')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <ErrorBoundary />,
    HydrateFallback: DefaultHydrateFallback
  }
]
