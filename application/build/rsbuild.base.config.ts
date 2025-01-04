import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core'
import { BaseConfig } from '@framework/build'

import { VERSION } from './utils'

const config = defineConfig({
  source: {
    alias: {
      '@': './src'
    },
    entry: {
      index: './src/index.tsx'
    },
    define: {
      'process.env.VERSION': JSON.stringify(`${VERSION}`)
    }
  },
  html: {
    title() {
      return process.env.TITLE || ''
    }
  }
})

export default mergeRsbuildConfig(BaseConfig, config)
