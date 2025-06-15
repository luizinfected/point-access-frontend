import { useState } from 'react'
import type { User } from '../types/User'
import { TextField } from '@mui/material'
import { apiURL } from '../config'



type Props = {
  login: (user: User) => void
}

export default function Login({ login }: Props) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(`${apiURL}/code/${code}`)

      const user = await response.json()

      if (!user || user.error) {
        setError(user?.error || 'User not found')
        return
      }

      login(user)

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(err as string || 'Error fetching user')
      }
    }
}

  return (
    <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleSubmit} className="bg-transparent p-6 rounded-xl w-full sm:w-[400px]">
          <p className="mb-10 text-center text-4xl">Ponto <span className='font-bold'>Ilumeo</span></p>

          <TextField 
              label="Código do usuário" 
              variant="outlined"
              
              value={code}
              
              className="shadow-md w-full mb-2 bg-[#A7C1A8] rounded-md transition duration-200 hover:scale-110"
              onChange={(e) => setCode(e.target.value)}
              required
              slotProps={{
                  input: {
                      style: {
                          color: 'white',               
                          backgroundColor: '#A7C1A8',
                          borderColor: '#D1D8BE',
                      },
                  },
                  inputLabel: {
                      style: {
                          color: 'white',    
                          borderColor: '#D1D8BE',
                      },
                  },
              }}
              sx={{
                  '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                      borderColor: '#D1D8BE',
                  },
                  '&:hover fieldset': {
                      borderColor: '#D1D8BE',
                  },
                  '&.Mui-focused fieldset': {
                      borderColor: '#D1D8BE',
                  },
                  },
              }}
          />

          <p className="text-red-300 mt-3">{error}</p>

          <button className="shadow-md w-full bg-[#EEEFE0] font-bold text-gray-500 py-2 rounded my-5 transition duration-200 hover:scale-110">
              Confirmar
          </button>
        </form>
    </div>
  )
}
