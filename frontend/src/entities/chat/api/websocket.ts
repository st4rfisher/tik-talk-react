import type { ChatWSMessage } from '../model/types'

function chatWebsocketUrl(): string {
  const url = new URL(import.meta.env.VITE_API_BASE_URL)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  url.pathname = `${url.pathname.replace(/\/$/, '')}/chat/ws`

  return url.toString()
}

export function connectWebsocket(token: string, onMessage: (message: ChatWSMessage) => void) {
  const websocket = new WebSocket(chatWebsocketUrl(), [token])

  websocket.onmessage = (event: MessageEvent<string>) => {
    const message = JSON.parse(event.data) as ChatWSMessage
    onMessage(message)
  }

  return () => {
    websocket.close()
  }
}
