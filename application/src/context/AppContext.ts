import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeColor = 'light' | 'dark' | 'auto'

export interface AppContextState {
  /** 主题色 */
  theme: ThemeColor
  /** 设置主题 */
  setTheme: (theme: ThemeColor) => void
  /** 是否已水合 */
  isHydrated: boolean
}

const appContextStore = create<AppContextState>()(
  persist(
    (set) => ({
      theme: 'auto',
      isHydrated: false,
      setTheme: (theme: ThemeColor) => {
        set({ theme })
      }
    }),
    {
      name: 'app-context'
    }
  )
)

export const useAppContext = appContextStore
