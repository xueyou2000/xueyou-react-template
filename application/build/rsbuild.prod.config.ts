import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { InjectManifest } from '@aaroon/workbox-rspack-plugin'
import { join } from 'node:path'

import baseConfig from './rsbuild.base.config'

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
        assetPrefix: process.env.CLIENT_ASSET_PREFIX || '/',
        legalComments: 'none'
        // polyfill: 'usage'
        // externals: {
        //   react: 'React',
        //   'react-dom': 'ReactDOM'
        // }
      },
      html: {
        // tags: [
        //   {
        //     tag: 'script',
        //     publicPath: false,
        //     append: false,
        //     attrs: {
        //       src: 'https://unpkg.com/react-umd@19.0.0/dist/react.umd.js',
        //       defer: true
        //     }
        //   },
        //   {
        //     tag: 'script',
        //     publicPath: false,
        //     append: false,
        //     attrs: {
        //       src: 'https://unpkg.com/react-umd@19.0.0/dist/react-dom.umd.js',
        //       defer: true
        //     }
        //   }
        // ]
      }
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
  }
})

export default mergeRsbuildConfig(baseConfig, config)
