import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { BASE_URL } from '../constants/urls'

import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [cartCount, setCartCount] = useState(0)
   const navigate = useNavigate()

      useEffect(() => {
      const fetchCartCount = async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/cart/countbyuserid`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: 1 }),
          })
          if (!res.ok) throw new Error('Failed to fetch cart count')
          const data = await res.json()
          setCartCount(data.count)
        } catch (error) {
          console.error(error)
        }
      }
    
      fetchCartCount()
      const interval = setInterval(fetchCartCount, 1000) 
    
      return () => clearInterval(interval) 
    }, [])
    

  return (
    <>
      <div className='w-full  border-red-800 min-h-[20px]'>
        
      </div>
      <div className='min-h-[80px] flex items-center  w-full bg-green-500'>
        <div className='w-[88%] ml-[6%] h-[100%]  border-red-400 bg-green-500 flex justify-between items-center'>
          <div className='w-[30%]  h-[60%] min-h-[50px]  border-red-500 rounded-3xl justify-between flex items-center bg-white'>
            <div className='w-[41%]   border-red-400 h-full rounded-l-3xl flex items-center'>
              <select
                className="w-full h-full rounded-l-3xl px-4 text-sm border-none outline-none cursor-pointer"
                defaultValue="all"
              >
                <option value="all">all categories</option>
                <option value="cat1">Category 1</option>
                <option value="cat2">Category 2</option>
                <option value="cat3">Category 3</option>
              </select>
            </div>
            <div className='w-[47%]  border-red-400 h-full'>
              <input
                type="text"
                className="w-full h-full px-3 py-2 text-sm outline-none border-none"
                placeholder="Search cows"
              />
            </div>
            <div className=' border-red-400 w-[12%] h-full rounded-r-3xl flex items-center justify-center'>
              <Search size={20} />
            </div>
          </div>
          <div className=' border-red-400 w-[20%] h-[60%] flex justify-center items-center '>
            <p className='font-bold text-lg text-white'>Free Shopping Over Sytem</p>
          </div>
          <div className=' border-red-400 w-[20%] h-[60%] flex justify-center items-center '>
            <p className='font-bold text-lg text-white'>30 Days Money Back</p>
          </div>
          <div className=' border-red-400 w-[20%] h-[60%] flex justify-center items-center '>
            <p className='font-bold text-lg text-white'>100 secure Payment</p>
          </div>
          <button className="relative inline-flex items-center gap-2  text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition"  onClick={() => navigate('/cart')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h11.1M7 13L5.4 5H3" />
            </svg>

            <span className="text-sm font-semibold">Cart</span>

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-full font-bold rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
