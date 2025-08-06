import React, { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { BASE_URL } from '../constants/urls'

interface Cow {
  id: number
  name: string
  age: number
  category: number
  owner: number
  description: string
  price: string
  weight: string
  health_status: string
  breed: string
  purchase_status: string
  photos: string[]
  created_at: string
  discount: string
}

const CowsRow: React.FC = () => {
  const [cows, setCows] = useState<Cow[]>([])

  useEffect(() => {
    const fetchCows = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/allcows`)
        if (!response.ok) {
          throw new Error('Failed to fetch cows')
        }
        const data: Cow[] = await response.json()
        setCows(data)
      } catch (error) {
        console.error('Error fetching cows:', error)
      }
    }

    fetchCows()
  }, [])

  return (
    <div className="w-full flex flex-wrap pl-7 justify-start rounded-3xl bg-white gap-12  mt-[1%]">

      {cows.map((cow) => (
        <div key={cow.id} className="w-70 bg-white flex flex-col border-green-700 rounded-2xl">
          <div className="ml-[5%] mt-2 w-[90%] h-[80%]">
            <div className="relative h-[300px] border-red-500">
              <div className="absolute z-20 bg-green-500 rounded-xl flex justify-center items-center w-[17%] h-[20%] top-0 left-0">
                <p className="text-white text-sm font-bold">
                   -20%
                </p>
              </div>
              <div className="absolute z-10 w-[90%] left-[5%] mt-[10%] rounded-2xl h-[50%] rounded-lg">
                <img
                  src={cow.photos[0]}
                  alt={cow.name}
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="ml-[8%] mt-[-30%] h-[28%] w-[84%]">
            <div className="w-full flex flex-col justify-center h-[50%]">
              <p className="font-bold text-black-500 text-lg m-0">{cow.name}</p>
              <p className="text-black-500 text-sm m-0">{cow.description}</p>
            </div>

            <div className="w-full flex justify-start items-center border-red-600 h-[40%]">
             <p className="font-bold text-xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
               ${cow.price}
             </p>

            </div>
            <div className="h-[20%] w-full flex">
              <p className="text-green-700 font-bold text-sm">Free shipping</p>
            </div>
            <div className="h-[20%] w-full flex">
            <div
              className={`w-[7%] h-[100%] flex justify-center items-center rounded-full ${
                 cow.purchase_status.toLowerCase() === 'purchased'
                   ? 'bg-red-500'
                   : cow.purchase_status.toLowerCase() === 'offered'
                   ? 'bg-yellow-500'
                   : 'bg-green-500'
               }`}
               >

                <Check size={10} color="white" />
              </div>
              <p className="text-black ml-[4%] font-bold text-sm">{cow.purchase_status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CowsRow
