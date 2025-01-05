import { Link as RouterLink, LoaderFunctionArgs, useLoaderData } from 'react-router'
import React from 'react'

import ThemeSwitch from '@/components/ThemeSwitch'

import './index.scss'
import { useMatchMedia } from '@/utils'
import { Flex, Text, Button, Link, DropdownMenu } from '@radix-ui/themes'

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

  return <Button onClick={() => setCount(count + 1)}>计数: {count}</Button>
}

export default function Index() {
  const data = useLoaderData() as LoaderData
  const media = useMatchMedia()

  return (
    <div className="index-page">
      <header>
        <ThemeSwitch />
      </header>

      <h1>Index {data?.date}</h1>
      <p>预加载数据 {data?.url}</p>
      <p>当前媒体类型 {media}</p>
      <button className="btn">按钮</button>

      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <BuggyCounter />
      </Flex>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            Options
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
              <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

              <DropdownMenu.Separator />
              <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />
          <DropdownMenu.Item>Share</DropdownMenu.Item>
          <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <menu>
        <ul>
          <li>
            <Link asChild>
              <RouterLink to="/">Index</RouterLink>
            </Link>
          </li>
          <li>
            <Link asChild>
              <RouterLink to="/home">Home</RouterLink>
            </Link>
          </li>
          <li>
            <Link asChild>
              <RouterLink to="/about">About</RouterLink>
            </Link>
          </li>
        </ul>
      </menu>
    </div>
  )
}

export const element = <Index />
