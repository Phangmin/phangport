import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { initializeTheme } from './components/common/theme'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element with id "root" was not found.')
}

initializeTheme()

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
