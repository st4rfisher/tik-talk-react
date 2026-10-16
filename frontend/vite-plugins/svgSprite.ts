import { readdirSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import type { Plugin } from 'vite'

function toSymbol(fileName: string, svg: string): string {
  const name = basename(fileName, '.svg')
  const match = svg.match(/<svg([^>]*)>([\s\S]*)<\/svg>/)
  if (!match) throw new Error(`svg-sprite: не удалось разобрать ${fileName}`)

  const [, attrs, content] = match
  const symbolAttrs = attrs.replace(/\s(id|width|height|xmlns)="[^"]*"/g, '')

  return `<symbol id="${name}"${symbolAttrs}>${content.trim()}</symbol>`
}

function buildSprite(iconsDir: string): string {
  return readdirSync(iconsDir)
    .filter((file) => file.endsWith('.svg'))
    .sort()
    .map((file) => toSymbol(file, readFileSync(join(iconsDir, file), 'utf-8')))
    .join('')
}

export function svgSprite(iconsDir: string): Plugin {
  return {
    name: 'svg-sprite',

    transformIndexHtml() {
      return [
        {
          tag: 'svg',
          attrs: {
            xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true',
            style: 'position: absolute; width: 0; height: 0; overflow: hidden',
          },
          children: buildSprite(iconsDir),
          injectTo: 'body-prepend',
        },
      ]
    },

    configureServer(server) {
      server.watcher.add(iconsDir)
      server.watcher.on('all', (_event, file) => {
        if (file.startsWith(iconsDir) && file.endsWith('.svg')) {
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
  }
}
