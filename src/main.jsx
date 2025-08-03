import { createRoot } from 'react-dom/client'
import './index.css'
import { GunProvider } from './gun-react'
import App from './App'

const peers = ['https://gun-manhattan.herokuapp.com/gun', 'https://gunjs.herokuapp.com/gun', 'wss://gun-manhattan.herokuapp.com/gun', 'wss://gunjs.herokuapp.com/gun']

createRoot(document.getElementById('root')).render(
  <GunProvider peers={peers}>
    <App />
  </GunProvider>
)
