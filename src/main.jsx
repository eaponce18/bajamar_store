import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { router } from './routes'
import './index.css'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ 
      "client-id": "YOUR_PAYPAL_CLIENT_ID",
      currency: "USD"
    }}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </PayPalScriptProvider>
  </React.StrictMode>,
)
