// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/public.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App /> {/* App now contains the Router */}
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)