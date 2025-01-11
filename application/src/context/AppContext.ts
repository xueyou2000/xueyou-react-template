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
  /** 设置水合 */
  setIsHydrated: (isHydrated: boolean) => void
}

const appContextStore = create<AppContextState>()(
  persist(
    (set) => ({
      theme: 'auto',
      isHydrated: false,
      setTheme: (theme: ThemeColor) => {
        console.log('>>> setTheme', theme)
        set({ theme })
      },
      setIsHydrated: (isHydrated: boolean) => {
        set({ isHydrated })
      }
    }),
    {
      name: 'app-context'
    }
  )
)

export const useAppContext = appContextStore
