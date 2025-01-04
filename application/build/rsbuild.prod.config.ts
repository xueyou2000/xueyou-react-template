import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'

import baseConfig from './rsbuild.base.config'

const config = defineConfig({
  output: {
    assetPrefix: process.env.CLIENT_ASSET_PREFIX || '/',
    legalComments: 'none'
  },
  tools: {
    rspack(config, { appendPlugins }) {
      if (process.env.RSDOCTOR) {
        appendPlugins(
          new RsdoctorRspackPlugin({
            // 插件选项
          })
        )
      }
    }
  }
})

export default mergeRsbuildConfig(baseConfig, config)
