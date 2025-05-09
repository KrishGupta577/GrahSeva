import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextStore from './Context/ContextStore.jsx'

createRoot(document.getElementById('root')).render(
  <ContextStore>
    <App />
  </ContextStore>
)
