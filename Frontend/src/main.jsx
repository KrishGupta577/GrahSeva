<<<<<<< HEAD
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextStore from './Context/ContextStore.jsx'

createRoot(document.getElementById('root')).render(
  <ContextStore>
    <App />
  </ContextStore>
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
>>>>>>> 2b007e2ab7115c5bae8ae14165ac37e6961d197f
)
