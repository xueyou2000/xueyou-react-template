import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router'

import './index.scss'

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

export default function Home() {
  const data = useLoaderData() as LoaderData

  return (
    <div className='home-page'>
      <h1>Home {data?.date}</h1>
      <p>预加载数据 {data?.url}</p>

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

export const element = <Home />
