import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AppContextState {
  /** 主题色 */
  theme: 'light' | 'dark'
  /** 是否有用户手动设置的主题偏好 */
  hasUserPreference: boolean
  /** 是否已初始化 */
  initialized: boolean
  /** 设置主题 */
  setTheme: (theme: 'light' | 'dark', hasPreference?: boolean) => void
  /** 初始化主题 */
  initializeTheme: () => void
}

const appContextStore = create<AppContextState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      hasUserPreference: false,
      initialized: false,
      setTheme: (theme: 'light' | 'dark', hasPreference: boolean = true) => {
        set({ theme, hasUserPreference: hasPreference })
      },
      initializeTheme: () => {
        const { hasUserPreference, initialized } = get()
        if (!hasUserPreference && !initialized) {
          const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          const theme = darkModeMediaQuery.matches ? 'dark' : 'light'
          set({ theme, initialized: true })
        }
      }
    }),
    {
      name: 'app-context'
    }
  )
)

export const useAppContext = appContextStore
