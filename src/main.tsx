import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App.tsx'
import { authInterceptors } from '@/entities/session'
import { initApi } from '@/shared/api'
import '@/app/styles/index.scss'
import '@/shared/ui/styles/index.scss'

initApi(authInterceptors)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
