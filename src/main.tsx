import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Remove strict mode to avoid double rendering of confetti
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)