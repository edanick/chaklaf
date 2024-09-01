import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CartProductsProvider } from './Contexts/CartProductsContext.tsx'

import axios, { InternalAxiosRequestConfig } from 'axios';


axios.defaults.baseURL = 'http://localhost:8080/api/v1';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProductsProvider>
      <App />
    </CartProductsProvider>
  </StrictMode>,
)
