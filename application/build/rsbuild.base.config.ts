import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core'
import { BaseConfig } from '@framework/build'

import { BUILD_MANIFEST_NAME, SSR_RENDER_FILE, VERSION } from './utils'

const config = defineConfig({
  environments: {
    web: {
      source: {
        entry: {
          index: './src/index.tsx'
        },
        define: {
          'process.env.VERSION': JSON.stringify(`${VERSION}`)
        }
      },
      output: {
        target: 'web',
        manifest: BUILD_MANIFEST_NAME
      },
      html: {
        template: './index.html',
        title() {
          return process.env.TITLE || ''
        }
        // 非常奇怪，manifest写在此处就不生效，必须写在html文件内
        // tags: [
        //   (tags) => {
        //     return [
        //       {
        //         tag: 'link',
        //         publicPath: true,
        //         append: false,
        //         attrs: {
        //           ref: 'manifest',
        //           href: `${process.env.CLIENT_ASSET_PREFIX}${MANIFEST_NAME}`
        //         }
        //       },
        //       ...tags
        //     ]
        //   }
        // ]
      }
    },
    ssr: {
      source: {
        entry: {
          index: SSR_RENDER_FILE
        }
      },
      output: {
        target: 'node',
        distPath: {
          root: 'dist/server'
        }
      },
      html: {
        template: '../index.html'
      }
    }
  },
  source: {
    alias: {
      '@': './src'
    }
  }
})

export default mergeRsbuildConfig(BaseConfig, config)
