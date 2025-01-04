import { useEffect, useState } from 'react'
import './style.scss'

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // 初始化时从 localStorage 获取主题设置
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    // 更新 html 标签的 data-theme 属性
    document.documentElement.setAttribute('data-theme', newTheme)
    // 保存主题设置到 localStorage
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button className="theme-switch" onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
