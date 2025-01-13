import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { InjectManifest } from '@aaroon/workbox-rspack-plugin'
import { join } from 'node:path'

import baseConfig from './rsbuild.base.config'
import { CLIENT_ASSET_PREFIX } from './utils'

const config = defineConfig({
  environments: {
    web: {
      source: {
        // tips: react-router路由相关包现在都是es6语法，如果需要兼容性请打开注释转换代码，但会增加打包大小
        // include: [
        //   /[\\/]node_modules[\\/](react|react-router|cookie|zustand|react-router-dom|react-icons|react-iconsn[\\/]fa|react-scan|react-helmet-async)/
        // ]
      },
      output: {
        target: 'web',
        assetPrefix: CLIENT_ASSET_PREFIX,
        legalComments: 'none'
        // polyfill: 'usage'
        // externals: {
        //   react: 'React',
        //   'react-dom': 'ReactDOM',
        //   'react-dom/client': 'ReactDOM'
        // }
      }
      // html: {
      //   // React19开始不提供UMD版本
      //   tags: [
      //     {
      //       tag: 'script',
      //       publicPath: false,
      //       append: false,
      //       attrs: {
      //         src: 'https://esm.sh/react@19.0.0',
      //         type: 'module',
      //         defer: true
      //       }
      //     },
      //     {
      //       tag: 'script',
      //       publicPath: false,
      //       append: false,
      //       attrs: {
      //         src: 'https://esm.sh/react-dom@19.0.0',
      //         type: 'module',
      //         defer: true
      //       }
      //     }
      //   ]
      // }
    }
  },
  tools: {
    rspack(config, { appendPlugins }) {
      appendPlugins(
        new InjectManifest({
          swSrc: join(__dirname, '../src/sw.config.ts'),
          swDest: 'service-worker.js' // 默认为 'service-worker.js'
        })
      )
      if (process.env.RSDOCTOR) {
        appendPlugins(
          new RsdoctorRspackPlugin({
            // 插件选项
            supports: {
              generateTileGraph: true
            }
          })
        )
      }
    }
  },
  performance: {
    chunkSplit: {
      strategy: 'custom',
      forceSplitting: {
        common: /node_modules[\\/](react|react-dom|scheduler|react-router|react-helmet-async|react-fast-compare)[\\/]/
      }
    }
  }
})

export default mergeRsbuildConfig(baseConfig, config)
