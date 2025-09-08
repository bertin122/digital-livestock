import { Check, Trash2 } from 'lucide-react'
import React from 'react'

interface CartcowProps {
  id: number
  image: string
  name: string
  description: string
  price: number
  discount: number
  status: string
  onRemove: (id: number) => void  
}

const Cartcow: React.FC<CartcowProps> = ({
  id, image, name, description, price, discount, status, onRemove
}) => {
  return (
    <div className='h-80 flex w-full'> 
      <div className="w-[50%] h-full flex justify-center items-center relative">
        <div className="relative w-3/4 h-3/4">
          <div className="absolute -top-7 -left-6 w-15 h-15 bg-green-500 flex justify-center items-center rounded-xl z-10">
            <p className='font-bold text-white'>-{discount}%</p>
          </div>

          <div className="w-full h-full rounded-3xl">
            <img 
              src={image} 
              alt={name}
              className='w-full h-full object-cover rounded-3xl'
            />  
          </div>
        </div>
      </div>

      <div className='w-[50%] flex items-center h-full'>
        <div className='w-[80%] flex flex-col h-[70%]'>
          <p className='font-bold text-2xl'>{name}</p>
          <p>{description}</p>
          <p className='font-bold text-black text-2xl'>${price}</p>
          <p>$2 in shipping</p>

          <div className='w-full flex items-center justify-start h-[14%]'>
            <div
              className={`flex justify-center items-center w-5 rounded-full h-5 ${
                status === 'Available' ? 'bg-green-500' :
                status === 'Offered' ? 'bg-yellow-500' :
                status.toLowerCase() === 'purchased' ? 'bg-red-500' :
                'bg-green-500'
              }`}
            >
              <Check className="text-white" />
            </div>
            <p className='text-black font-bold ml-[2%]'>{status}</p>
          </div>

          <div className="flex justify-start items-center w-full h-[30%]">
            <button 
              onClick={() => onRemove(id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Trash2 size={20} />
              <p>Remove</p>
            </button>
          </div>
        </div>     
      </div>
    </div>
  )
}

export default Cartcow
