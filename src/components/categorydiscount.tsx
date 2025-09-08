import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../constants/urls';

export const Categorydiscount: React.FC = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/categories/all`)
        if (!res.ok) throw new Error('Failed to fetch categories')
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className='h-full bg-white w-[20%] rounded-2xl border-red-500 overflow-auto'>
      <div className='h-[10%] border-red-400 flex items-center'>
        <p className='text-md ml-[17%] font-bold text-red-500'>SALE 40% OFF</p>
      </div>

      {categories.map((category) => (
        <div
          key={category.id}
          className='h-[7%] w-full border-black flex items-center'
        >
          <p className='text-md ml-[17%] font-bold'>{category.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Categorydiscount
