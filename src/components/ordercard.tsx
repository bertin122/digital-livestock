import React from 'react'
import { Check } from 'lucide-react'

interface Cow {
  id: number
  name: string
  price: string
  photos: string[]
}

interface CartItem {
  id: number
  cow: Cow
}

interface OrderCardProps {
  cartItems: CartItem[]
  allNames: string
  shippingFee: number
  totalPrice: number
  phone: string
  setPhone: (value: string) => void
  handlePlaceOrder: () => void
}

const OrderCard: React.FC<OrderCardProps> = ({
  cartItems,
  allNames,
  shippingFee,
  totalPrice,
  phone,
  setPhone,
  handlePlaceOrder,
}) => {
  return (
    <div className='w-[25%] p-4 border border-green-500 rounded-2xl shadow-md bg-white'>
      <p className='font-bold text-lg mb-3'>Your Order</p>

      <div className='w-full flex flex-col h-[97%] rounded-xl bg-gray-200 p-3'>

        <div className='p-2 flex justify-between items-center w-full h-[10%] border-b border-gray-300'>
          <p className='font-medium'>Product</p>
          <p className='font-medium'>Sub Total</p>
        </div>

        <div className='w-full py-2 flex items-start h-[15%] gap-3 border-b border-gray-300'>
          <div className='h-14 w-14 rounded overflow-hidden bg-white shadow'>
            {cartItems[0]?.cow.photos[0] && (
              <img
                src={cartItems[0].cow.photos[0]}
                alt={cartItems[0].cow.name}
                className='w-full h-full object-cover'
              />
            )}
          </div>
          <div className='flex-1'>
            <p className='text-sm'>{allNames || 'No items'}</p>
          </div>
        </div>

        <div className='w-full px-2 py-2 flex justify-between h-[10%] border-b border-gray-300'>
          <p className='text-sm'>Shopping fee</p>
          <p className='text-sm text-red-500 font-bold'>${shippingFee}</p>
        </div>

        <div className='w-full px-2 py-2 flex justify-between h-[10%] border-b border-gray-300'>
          <p className='text-md font-bold'>Order Total</p>
          <p className='text-md text-green-600 font-bold'>${totalPrice.toFixed(2)}</p>
        </div>

        <div className='w-full flex flex-col justify-center rounded-b-xl bg-gray-300 p-3 flex-1 mt-2'>
          <div className='w-full flex h-[50%] gap-3'>

            <div className='w-[15%] flex justify-center items-center'>
              <div className='w-8 h-8 rounded-md bg-green-500 flex justify-center items-center'>
                <Check className='text-white w-4 h-4' />
              </div>
            </div>

            <div className='w-[85%] flex flex-col gap-1'>
              <p className='font-bold text-sm'>Mobile Money</p>
              <p className='text-xs text-gray-700 leading-tight'>
                Confirm payment on your phone and wait for the order to succeed.
              </p>
              <input
                type='tel'
                placeholder='+2507*****'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='w-full h-8 rounded-sm border border-gray-300 text-sm px-2 outline-none placeholder:text-xs'
              />
            </div>
          </div>

          <div className='w-full mt-4'>
            <button
              onClick={handlePlaceOrder}
              className='w-full h-10 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium transition'
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
