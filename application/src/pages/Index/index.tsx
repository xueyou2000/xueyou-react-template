import { LoaderFunctionArgs, useLoaderData } from 'react-router'
import React, { useEffect } from 'react'

import { Nav } from './Nav'

import './index.scss'
import { VERSION_TIME } from '@/constants/env'

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

  return (
    <button className='btn' onClick={() => setCount(count + 1)}>
      点我5此触发崩溃: {count}
    </button>
  )
}

export default function Index() {
  const data = useLoaderData() as LoaderData

  useEffect(() => {
    console.log('版本: ', VERSION_TIME)
  }, [])

  return (
    <div className='index-page page-layout'>
      <Nav />

      <h1>主页</h1>
      <p>获取loader数据: {JSON.stringify(data || {})}</p>

      <BuggyCounter />
    </div>
  )
}

export const element = <Index />
