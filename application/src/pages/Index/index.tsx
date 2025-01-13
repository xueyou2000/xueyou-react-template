import { NavLink as RouterLink, LoaderFunctionArgs, useLoaderData } from 'react-router'
import React from 'react'

import { Spinner } from '@/components'

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

  return <button onClick={() => setCount(count + 1)}>计数: {count}</button>
}

export default function Index() {
  const data = useLoaderData() as LoaderData

  return (
    <div className='index-page'>
      <h1>Index {data?.url}</h1>
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
            <RouterLink to='/performance'>Performance</RouterLink>
          </li>
          <li>
            <RouterLink to='/about'>{({ isPending }) => <span>About {isPending && <Spinner />}</span>}</RouterLink>
          </li>
        </ul>
      </menu>
    </div>
  )
}

export const element = <Index />
