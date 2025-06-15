import { useEffect, useState } from 'react'
import type { User } from '../types/User'
import type { Timestamps } from '../types/Timestamps'
import { apiURL } from '../config'


type Props = {
    user: User
}

export default function Dashboard({ user }: Props) {
    const [changeButton, setChangeButton] = useState('IN')
    const [timestamps, setTimestamps] = useState<Timestamps>()

    async function handleButtonClick() {
        await sendTimestamp()
        await getTimestamps(user)

        setChangeButton(prev => (prev === 'IN' ? 'OUT' : 'IN'))
    }

    async function getTimestamps(user: User) {
        try {
            const response = await fetch(`${apiURL}/registers/${user.code}`)

            if (!response.ok) {
                throw new Error('Error fetching timestamps')
            }

            const timestamps = await response.json()
            setTimestamps(timestamps)
            
            } catch (error) {
                console.error(error)
            }
    }

    async function sendTimestamp() {
        try {
             await fetch(`${apiURL}/registers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userCode: user.code, type: changeButton }),
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const timestamps = [...user.timestamps]

        if(timestamps.length > 0) {
            
            const sortedTimestamps = timestamps.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )

            const last = sortedTimestamps[0]

            if (last.type === 'IN') {
                setChangeButton('OUT')
            } else {
                setChangeButton('IN')
            }
        }
    }, [user.timestamps])


   useEffect(() => {
        getTimestamps(user)
    }, [user])

  return (
    <div className="flex justify-center items-center h-screen p-2">
        <div className='w-full sm:w-[400px]'>
            <p className='font-bold text-center text-4xl mb-10'>Relógio de ponto</p>
            <div className="flex flex-col my-8">
                <p className=''>Código de usuário:</p>
                <p className='font-bold text-3xl'>#{user.code}</p>
            </div>


            <h1 className='font-bold text-6xl text-center mt-6 transition duration-200 hover:scale-110'>{timestamps?.todayHours ? timestamps?.todayHours : '00:00'}</h1>
            <h2 className='font-bold text-center'>Horas trabalhadas hoje</h2>

            <button className="shadow-md w-full bg-[#EEEFE0] font-bold text-gray-500 py-2 rounded my-5 transition duration-200 hover:scale-110" onClick={handleButtonClick}>
                {changeButton === 'IN' ? 'Iniciar turno' : 'Sair do turno'}
            </button>
            
            <h2 className='font-bold mb-5 text-center mt-10'>Dias anteriores</h2>

            {
                timestamps?.result?.map((timestamp: {date: string, worked: string}) => (
                    <div className='shadow-md rounded-md bg-[#ebebeb7e] p-4 w-full flex justify-between items-center mt-1 transition duration-200 hover:scale-110'>
                        <p className='font-bold'>{timestamp.worked}</p>
                        <p>{timestamp.date}</p>
                    </div>
                ))
            }


        </div>
      
    </div>
  )
}
