import { Link as RouterLink, LoaderFunctionArgs, useLoaderData } from 'react-router'
import React from 'react'

import ThemeSwitch from '@/components/ThemeSwitch'

import './index.scss'
import { useMatchMedia } from '@/utils'

interface LoaderData {
  date: string
  url: string
}

/**
 * 路由预加载数据
 */
export const loader = async (args: LoaderFunctionArgs): Promise<LoaderData> => {
  return {
    date: new Date().toLocaleString(),
    url: args.request?.url
  }
}

function BuggyCounter() {
  const [count, setCount] = React.useState(0)

  if (count === 5) {
    throw new Error('我崩溃了！')
  }

  return <button onClick={() => setCount(count + 1)}>计数: {count}</button>
}

export default function Index() {
  const data = useLoaderData() as LoaderData
  const media = useMatchMedia()

  return (
    <div className='index-page'>
      <header>
        <ThemeSwitch />
      </header>

      <h1>Index {data?.date}</h1>
      <p>预加载数据 {data?.url}</p>
      <p>当前媒体类型 {media}</p>
      <button className='btn'>按钮</button>

      <BuggyCounter />

      <menu>
        <ul>
          <li>
            <RouterLink to='/'>Index</RouterLink>
          </li>
          <li>
            <RouterLink to='/home'>Home</RouterLink>
          </li>
          <li>
            <RouterLink to='/about'>About</RouterLink>
          </li>
        </ul>
      </menu>
    </div>
  )
}

export const element = <Index />
