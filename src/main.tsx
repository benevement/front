<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
//import UserProvider from './context/UserProvider.tsx' // commenté 23/07/25
import { BrowserRouter } from 'react-router-dom'
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
>>>>>>> 1f501829afe576b7e04be1fecf169d9fa1b6918f

createRoot(document.getElementById("root")!).render(
  <StrictMode>
<<<<<<< HEAD
    {/* <UserProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </UserProvider> */}
  </StrictMode>,
)
=======
    <App />
  </StrictMode>
);
>>>>>>> 1f501829afe576b7e04be1fecf169d9fa1b6918f
