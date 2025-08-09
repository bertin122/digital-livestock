import Recentlyviewed from '../components/recentlyviewed'
import Header from '../components/header'
import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../constants/urls'
import Modal from '../modals/modal' 
import OrderCard from '../components/ordercard'

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

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Address fields state
  const [province, setProvince] = useState('')
  const [territory, setTerritory] = useState('')
  const [sector, setSector] = useState('')
  const [quarter, setQuarter] = useState('')
  const [village, setVillage] = useState('')

  const [phone, setPhone] = useState('')

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null)
  const [modalMessage, setModalMessage] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/cart/itemsbyid`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: 1 }),
        })
        if (!res.ok) throw new Error(`Error ${res.status}`)
        const data: CartItem[] = await res.json()
        setCartItems(data)
      } catch (error) {
        console.error('Error fetching cart items:', error)
      }
    }

    fetchCartItems()
  }, [])

  const shippingFee = 35 * cartItems.length
  const taxFee = 10 * cartItems.length
  const totalPrice =
    cartItems.reduce((sum, item) => sum + parseFloat(item.cow.price), 0) +
    shippingFee +
    taxFee

  const allNames = cartItems.map((item) => item.cow.name).join(', ')

  const showError = (message: string) => {
    setModalType('error')
    setModalMessage(message)
    setShowModal(true)
  }

  const handlePlaceOrder = async () => {
    
  if (!phone || phone.length !== 13 || !/^\+\d{12}$/.test(phone)) {
    showError('enter a valid phone number !')
    return
  }

  if (!province || !territory || !sector || !quarter || !village) {
    showError('Please fill all address fields')
    return
  }

  const addresses = [province, territory, sector, quarter, village]

  try {
    for (const item of cartItems) {
      const res = await fetch(`${BASE_URL}/api/order/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          cow_id: item.cow.id,
          address: addresses,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        console.error('Order creation failed:', error.message || 'Unknown error')
        showError('Failed to create order!')
        return
      }
    }

    console.log('All orders placed successfully')
    setModalType('success')
    setModalMessage('Order placed successfully  !')
    setShowModal(true)

    
    setFirstName('')
    setLastName('')
    setProvince('')
    setTerritory('')
    setSector('')
    setQuarter('')
    setVillage('')
    setPhone('')

  } catch (error: any) {
    console.error('Unexpected error:', error.message)
    showError('Unexpected error occurred!')
  }
}



  return (
    <div className="bg-[rgb(216,209,209)] w-full h-auto flex flex-col overflow-y-auto">
      <Header />

      <div className="p-12 bg-white gap-5 flex items-end rounded-3xl ml-[5%] mt-[1%] w-[90%] border-yellow-500 justify-between">

        <div className='w-[30%] flex flex-col justify-between h-120'>

          <div className='w-full flex p-2 items-center font-bold h-[8%]'>
            <p>Billing details</p>
          </div>

          <div className='w-full flex h-[15%]'>
            <div className='flex flex-col h-full w-[50%] p-2'>
              <label className='flex items-center'>
                First Name <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                    type='text'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    style={{ border: '0.1px solid #ccc' }}
                    className='rounded-lg p-1 outline-none'
                    placeholder=''
                  />
            </div>

            <div className='flex flex-col h-full w-[50%] p-2'>
              <label className='flex items-center'>
                Last Name <span className='text-red-500 ml-1'>*</span>
              </label>
             <input
               type='text'
               value={lastName}
               onChange={e => setLastName(e.target.value)}
               style={{ border: '0.1px solid #ccc' }}
               className='rounded-lg p-1 outline-none'
               placeholder=''
             />
            </div>
          </div>

          <div className='w-full flex flex-col p-2 h-[14%]'>
            <label className='flex items-center'>Province</label>
            <input
              type='text'
              value={province}
              onChange={e => setProvince(e.target.value)}
              style={{ border: '0.1px solid #ccc' }}
              className='rounded-lg p-1 outline-none'
              placeholder=''
            />
          </div>

          <div className='w-full flex flex-col p-2 h-[14%]'>
            <label className='flex items-center'>Territory/city</label>
            <input
              type='text'
              value={territory}
              onChange={e => setTerritory(e.target.value)}
              style={{ border: '0.1px solid #ccc' }}
              className='rounded-lg p-1 outline-none'
              placeholder=''
            />
          </div>

          <div className='w-full flex flex-col p-2 h-[14%]'>
            <label className='flex items-center'>Sector/cheifdom</label>
            <input
              type='text'
              value={sector}
              onChange={e => setSector(e.target.value)}
              style={{ border: '0.1px solid #ccc' }}
              className='rounded-lg p-1 outline-none'
              placeholder=''
            />
          </div>

          <div className='w-full flex flex-col p-2 h-[14%]'>
            <label className='flex items-center'>Quarter</label>
            <input
              type='text'
              value={quarter}
              onChange={e => setQuarter(e.target.value)}
              style={{ border: '0.1px solid #ccc' }}
              className='rounded-lg p-1 outline-none'
              placeholder=''
            />
          </div>

          <div className='w-full flex flex-col p-2 h-[14%]'>
            <label className='flex items-center'>Village</label>
            <input
              type='text'
              value={village}
              onChange={e => setVillage(e.target.value)}
              style={{ border: '0.1px solid #ccc' }}
              className='rounded-lg p-1 outline-none'
              placeholder=''
            />
          </div>

        </div>

        <OrderCard
          cartItems={cartItems}
          allNames={allNames}
          shippingFee={shippingFee}
          totalPrice={totalPrice}
          phone={phone}
          setPhone={setPhone}
          handlePlaceOrder={handlePlaceOrder}
        />

      </div>

      <div className="w-full h-[20%] mt-[2%]"></div>

      
      {showModal && modalMessage && modalType && (
        <Modal onClose={() => setShowModal(false)}>
          {modalType === 'success' && (
            <div className="w-100 h-12 flex justify-center items-center">
              <div className="w-[10%] flex justify-center items-center rounded-full bg-green-500 h-[83%]">
                <Check className="text-white" />
              </div>
              <div className="w-[85%] flex items-center ml-3 h-full">
                <p className="font-bold">{modalMessage}</p>
              </div>
            </div>
          )}

          {modalType === 'error' && (
            <div className="w-100 h-12 flex justify-center items-center">
              <div className="w-[10%] flex justify-center items-center rounded-full bg-red-500 h-[83%]">
                <X className="text-white" />
              </div>
              <div className="w-[85%] flex items-center ml-3 h-full">
                <p className="font-bold">{modalMessage}</p>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}

export default Checkout
