import { createRoot } from 'react-dom/client'
import { scan } from 'react-scan'

import { App } from './App'
import { isDevMode } from './constants/env'

if (isDevMode) {
  if (typeof window !== 'undefined') {
    scan({
      enabled: true,
      log: false // logs render info to console (default: false)
    })
  }
}

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
