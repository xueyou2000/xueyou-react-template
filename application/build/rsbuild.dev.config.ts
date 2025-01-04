import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core'
import baseConfig from './rsbuild.base.config'

const config = defineConfig({
  dev: {
    lazyCompilation: true
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 8080,
    historyApiFallback: {
      verbose: false
    }
  }
})

export default mergeRsbuildConfig(baseConfig, config)
