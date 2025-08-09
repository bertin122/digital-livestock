import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { BASE_URL } from '../constants/urls'
import Recentlyviewed from '../components/recentlyviewed'
import Header from '../components/header'
import Cartcow from '../components/cartcow'
import Modal from '../modals/modal'
import { ShoppingCart } from 'lucide-react'

interface Cow {
  id: number
  name: string
  description: string
  price: string
  photos: string[]
  discount: string
  purchase_status: string
}

interface CartApiItem {
  id: number
  user_id: number
  cow_id: number
  added_at: string
  cow: Cow
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartApiItem[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null)
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.cow.price), 0)
  const shipping = cartItems.length * 35
  const tax = cartItems.length * 10
  const total = subtotal + shipping + tax

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/cart/itemsbyid`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: 1 }),
        })
        const data = await response.json()
        setCartItems(data)
      } catch (error) {
        console.error('Failed to fetch cart items:', error)
      }
    }

    fetchCartItems()
  }, [])

  // Close modal automatically after 4 seconds
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => setShowModal(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [showModal])

  const handleRemove = async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cart/removebyid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      const data = await res.json()

      if (!res.ok) {
        setModalType('error')
        setModalMessage(data.message || 'Failed to remove item')
        setShowModal(true)
        return
      }

      setCartItems(prev => prev.filter(item => item.id !== id))
      setModalType('success')
      setModalMessage('Cow removed successfully !')
      setShowModal(true)
    } catch (error) {
      console.error('Failed to remove cart item:', error)
      setModalType('error')
      setModalMessage('Failed to remove item')
      setShowModal(true)
    }
  }

  return (
    <div className="bg-[rgb(216,209,209)] w-full h-auto flex flex-col overflow-y-auto">
      <Header />

      <div className="p-12 bg-white gap-5 flex items-end rounded-3xl ml-[5%] mt-[1%] w-[90%] border-yellow-500 justify-between">
        <div className="w-200">
          {cartItems.length > 0 ? (
            cartItems.map(({ id, cow }) => (
              <Cartcow
                key={id}
                id={id}
                image={cow.photos[0]}
                name={cow.name}
                description={cow.description}
                price={Number(cow.price)}
                discount={Number(cow.discount)}
                status={cow.purchase_status}
                onRemove={handleRemove}
              />
            ))
          ) : (
          

             <div className=" border-gray-300 rounded-lg flex flex-col justify-center items-center w-[70%] h-80 mx-auto bg-gray-50">
               <ShoppingCart className="text-gray-400 mb-4" size={48} />
               <p className="text-gray-500 text-lg font-semibold">Your cart is empty.</p>
             </div>


          )}
        </div>

        {/* Order Summary */}
       <div className="w-100 rounded-3xl p-8 border border-green-500 h-80 shadow-lg">
  <div className="w-full flex items-center h-[12%]">
    <p className="font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      Order Summary
    </p>
  </div>

  <div className="w-full mt-6 flex justify-between py-2">
    <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Subtotal</span>
    <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>${subtotal}</span>
  </div>
  <hr />
  <div className="w-full flex justify-between py-2">
    <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Shipping Estimate</span>
    <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>${shipping}</span>
  </div>
  <hr />
  <div className="w-full flex justify-between py-2">
    <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Tax Estimate</span>
    <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>${tax}</span>
  </div>
  <hr />
  <div className="w-full flex justify-between font-bold py-2">
    <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Order Total</span>
    <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>${total}</span>
  </div>

  <a
  href="/checkout"
  className="block mt-4 w-[40%] mx-auto text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
>
  Checkout
</a>

</div>

      </div>

      <div className="w-[90%] ml-[5%] mt-[1%] h-[20%]">
        <div className="w-full flex items-center font-bold h-[12%]">
          <p style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Your Recently Viewed</p>
        </div>
        <Recentlyviewed />
      </div>

      

      {showModal && modalMessage && modalType && (
        <Modal onClose={() => setShowModal(false)}>
          {modalType === 'success' && (
            <div className="w-80 h-12  flex justify-center items-center">
              <div className="w-10 flex justify-center items-center rounded-full bg-green-500 h-10">
                <Check className="text-white" />
              </div>
              <div className="w-[85%] flex items-center ml-3 h-full">
                <p className="font-bold font-sans text-lg">{modalMessage}</p>
              </div>
            </div>
          )}

          {modalType === 'error' && (
            <div className="w-100 h-12 flex justify-center items-center">
              <div className="w-[10%] flex justify-center items-center rounded-full bg-red-500 h-[83%]">
                <X className="text-white" />
              </div>
              <div className="w-[85%] flex items-center ml-3 h-full">
                <p className="font-bold font-sans text-lg">{modalMessage}</p>
              </div>
            </div>
          )}
        </Modal>
      )}

      <div className="w-full  h-[20%] mt-[2%]">

        
      </div>
    </div>
  )
}

export default Cart
