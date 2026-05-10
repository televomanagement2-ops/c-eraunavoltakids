import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AdminModeProvider } from './context/AdminModeContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminModeProvider>
          <App />
        </AdminModeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
