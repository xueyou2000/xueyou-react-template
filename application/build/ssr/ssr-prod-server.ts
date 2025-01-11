/*eslint-env node*/
/*global process:false*/
import express from 'express'
import { join } from 'node:path'
import type { Request, Response, NextFunction } from 'express'
import { readFile } from 'node:fs/promises'

import { __dirname, require, serverRenderExpress } from './ssr-base'
import { SSRRenderModuleType } from './types'

const distDir = join(__dirname, '../../dist')

const serverRender = async (req: Request, res: Response, next: NextFunction) => {
  const moduleUrl = join(distDir, 'server/index.js')
  const SSRRenderModule = require(moduleUrl)

  serverRenderExpress(req, res, next, SSRRenderModule as SSRRenderModuleType, async () => {
    const template = await readFile(join(distDir, 'index.html'), 'utf-8')
    return template
  })
}

const port = process.env.PORT || 3000

export async function preview() {
  const app = express()

  app.get('*', (req, res, next) => {
    try {
      serverRender(req, res, next)
    } catch (err) {
      console.error('SSR render error, downgrade to CSR...\n', err)
      next()
    }
  })

  app.use(express.static('dist'))

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
}

preview()
