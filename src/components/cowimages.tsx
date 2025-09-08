import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants/urls'

interface CowImagesProps {
  id: number
}

const Cowimages: React.FC<CowImagesProps> = ({ id }) => {
  const [photos, setPhotos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCowImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/cows/byid`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })

        if (!response.ok) throw new Error('Failed to fetch cow images')

        const data = await response.json()
        setPhotos(data.photos || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      setLoading(true)
      fetchCowImages()
    }
  }, [id])

  if (loading) return null

  return (
    <div className="w-[29%] items-center h-100  flex-col rounded-3xl flex justify-between">
      <div
        className="w-full h-[63%] rounded-t-3xl bg-cover bg-center"
        style={{ backgroundImage: `url('${photos[0]}')` }}
      >
        <div className="w-[10%] m-4 h-[20%] flex justify-center items-center bg-green-500 rounded-xl">
          <p className="text-white font-bold">-20%</p>
        </div>
      </div>

      <div className="w-full h-[37%] flex justify-between items-end">
        <div className="w-[50%] h-[97%] rounded-bl-3xl">
          <img
            src={photos[1]}
            alt="cow"
            className="w-full h-full object-cover rounded-bl-3xl"
          />
        </div>
        <div className="w-[49%] h-[97%] rounded-br-3xl">
          <img
            src={photos[2]}
            alt="cow"
            className="w-full h-full object-cover rounded-br-3xl"
          />
        </div>
      </div>
    </div>
  )
}

export default Cowimages
