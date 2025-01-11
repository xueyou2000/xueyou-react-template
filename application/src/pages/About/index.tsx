import { Suspense } from 'react'
import { Link, LoaderFunctionArgs, useLoaderData, Await } from 'react-router'

import './index.scss'

interface LoaderData {
  date: string
  url: string
  aboutId?: string
  reviews: Promise<number>
}

interface AboutRouteParams {
  id: string
}

function sleep(ms: number) {
  return new Promise<number>((r) => setTimeout(() => r(10), ms))
}

/**
 * 路由预加载数据
 */
export async function loader(args: LoaderFunctionArgs<AboutRouteParams>): Promise<LoaderData> {
  // 注意这里直接返回promise, 在About组件中使用Await组件来获取数据
  const reviews = sleep(3500)

  return {
    date: new Date().toLocaleString(),
    url: args.request?.url,
    aboutId: args.params?.id,
    reviews
  }
}

export default function About() {
  const { date, url, aboutId, reviews } = useLoaderData() as LoaderData

  return (
    <div className='about-page'>
      <Suspense fallback={<div>数据加载...</div>}>
        <Await resolve={reviews}>{(resolvedReviews) => <p>reviews: {resolvedReviews}</p>}</Await>
      </Suspense>

      <h1>About {date}</h1>
      <p>{aboutId}</p>
      <p>预加载数据 {url}</p>

      <menu>
        <ul>
          <li>
            <Link to='/'>Index</Link>
          </li>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </menu>
    </div>
  )
}

export const element = <About />
