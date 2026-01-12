import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'  // <--- QUAN TRỌNG NHẤT: KHÔNG CÓ DÒNG NÀY LÀ MẤT MÀU

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
