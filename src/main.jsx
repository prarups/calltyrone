import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { loadSiteSettings } from './config/siteSettings'

// Load editable phone numbers / emails from settings.ini before first render.
loadSiteSettings().finally(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
