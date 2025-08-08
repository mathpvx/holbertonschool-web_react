import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App 
      isLoggedIn={true} 
    />
  </StrictMode>,
)

// isLoggedIn={true} coursesList={[]} displayDrawer={true}
