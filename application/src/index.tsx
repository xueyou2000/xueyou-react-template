import { scan } from 'react-scan'

import { routes } from './routes'
import { isDevMode, hasWindowMode } from './constants/env'
import { setupClientApp } from './renders/ClientRender'

if (isDevMode) {
  if (hasWindowMode) {
    scan({
      enabled: true,
      log: false // logs render info to console (default: false)
    })
  }
}

setupClientApp(routes)
