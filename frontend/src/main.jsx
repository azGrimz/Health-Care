import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from "./routes/routes"
import './global.css'
import { ContextProvider } from './components/Context/ContextName'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <AppRoutes/>
    </ContextProvider>
  </React.StrictMode>
)
