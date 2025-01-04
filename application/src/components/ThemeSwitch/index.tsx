import { useEffect } from 'react'
import { useAppContext } from '@/context/AppContext'
import './style.scss'

export default function ThemeSwitch() {
  const { theme, setTheme } = useAppContext()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <button className="theme-switch" onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
