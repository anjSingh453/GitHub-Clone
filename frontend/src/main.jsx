import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './authContext.jsx'
import ProjectRoutes from './Routes.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProjectRoutes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
