import { use, Usable } from 'react'
import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router'

import './index.scss'

interface LoaderData {
  date: string
  url: string
  aboutId?: string
  reviews: number
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
  const reviews = await sleep(1000)

  return {
    date: new Date().toLocaleString(),
    url: args.request?.url,
    aboutId: args.params?.id,
    reviews
  }
}

interface AwaitProps<Resolve> {
  children: (data: Resolve) => React.ReactNode
  resolve: Usable<Resolve>
}

export function Await2<Resolve>({ children, resolve }: AwaitProps<Resolve>) {
  const resolvedReviews = use(resolve)
  return children(resolvedReviews)
}

export default function About() {
  const { date, url, aboutId, reviews } = useLoaderData() as LoaderData
  // const resolvedReviews = use(reviews)

  // Await组件不支持react19, react19请直接使用 use(reviews) 获取数组. see https://reactrouter.com/how-to/suspense#1-return-a-promise-from-loader

  return (
    <div className='about-page'>
      <p>reviews: {reviews}</p>
      {/* <Suspense fallback={<div>数据加载...</div>}>
        <Await resolve={reviews} errorElement={<div>Could not load reviews 😬</div>}>
          {(resolvedReviews) => <div>{JSON.stringify(resolvedReviews)}</div>}
        </Await>
        <Await2 resolve={reviews}>{(resolvedReviews) => <p>reviews: {resolvedReviews}</p>}</Await2>
      </Suspense> */}

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
