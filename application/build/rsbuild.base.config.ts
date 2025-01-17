import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core'
import { BaseConfig } from '@framework/build'

import { BUILD_MANIFEST_NAME, CLIENT_ASSET_PREFIX, MANIFEST_NAME, SSR_RENDER_FILE, VERSION, VERSION_TIME } from './constants'

const config = defineConfig({
  environments: {
    web: {
      source: {
        entry: {
          index: './src/index.tsx'
        },
        define: {
          'process.env.VERSION': JSON.stringify(`${VERSION}`),
          'process.env.VERSION_TIME': JSON.stringify(`${VERSION_TIME}`)
        }
      },
      output: {
        target: 'web',
        manifest: BUILD_MANIFEST_NAME,
        copy: [
          {
            from: 'webmanifest.json',
            to: 'webmanifest.json',
            transform(input) {
              const content = input.toString()
              // content.replace(/BASE_URL/g, CLIENT_ASSET_PREFIX)

              // const json = JSON.parse(content)
              // // 改写 manifest start_url
              // json.start_url = CLIENT_ASSET_PREFIX
              // json.scope = CLIENT_ASSET_PREFIX
              return content.replace(/{BASE_URL}/g, CLIENT_ASSET_PREFIX)
            }
          }
        ]
      },
      html: {
        template: './index.html',
        templateParameters: {
          MANIFEST_NAME,
          CLIENT_ASSET_PREFIX
        },
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
