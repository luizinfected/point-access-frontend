import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import type { User } from './types/User'

function App() {
  const [user, setUser] = useState<User>()
  console.log('API_URL carregada:', import.meta.env.VITE_API_URL)



  return (
    <>
      {
        user
        ? <Dashboard user={user} />
        : <Login login={(u) => u && setUser(u)} />
      }
      
    </>
  )
}

export default App
