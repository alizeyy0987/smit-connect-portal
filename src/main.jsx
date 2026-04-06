import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#1E293B',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          }
        }} />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)


    
  
