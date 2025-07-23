import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
//import UserProvider from './context/UserProvider.tsx' // commenté 23/07/25
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <UserProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </UserProvider> */}
  </StrictMode>,
)
