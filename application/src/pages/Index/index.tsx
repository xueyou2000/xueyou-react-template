import { LoaderFunctionArgs, useLoaderData } from 'react-router'
import React, { useEffect } from 'react'

import { VERSION } from '@/constants/env'
import { useAppContext } from '@/context/AppContext'
import { Button } from '@packages/components'

import { Nav } from './Nav'

import './index.scss'

interface LoaderData {
  url: string
}

/**
 * 路由预加载数据
 */
export const loader = async (args: LoaderFunctionArgs): Promise<LoaderData> => {
  return {
    url: args.request?.url
  }
}

function BuggyCounter() {
  const [count, setCount] = React.useState(0)

  if (count === 5) {
    throw new Error('我崩溃了！')
  }

  return <Button onClick={() => setCount(count + 1)}>点我5此触发崩溃: {count}</Button>
}

function ToggleTheme() {
  const theme = useAppContext((state) => state.theme)
  const setTheme = useAppContext((state) => state.setTheme)
  return <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换主题</Button>
}

export default function Index() {
  const data = useLoaderData() as LoaderData

  useEffect(() => {
    console.log('版本: ', VERSION)
  }, [])

  return (
    <div className='index-page page-layout'>
      <header>
        <Nav />
      </header>

      <main>
        <h1>主页</h1>
        <section>
          <p>获取loader数据: {JSON.stringify(data || {})}</p>
          <BuggyCounter />
          <ToggleTheme />
        </section>
      </main>

      <aside>
        <h2>相关库</h2>
        <ul>
          <li>react v19</li>
          <li>react-router v7</li>
          <li>rsbuild</li>
        </ul>
      </aside>
    </div>
  )
}

export const element = <Index />
