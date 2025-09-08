import { Check, Clock, Dot, Phone, CreditCard, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants/urls'
import Modal from '../modals/modal'

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

interface Category {
  id: number
  name: string
  photo: string
}

interface Owner {
  fullnames: string
}

interface RightcowcardProps {
  id: number | string
}

const Rightcowcard: React.FC<RightcowcardProps> = ({ id }) => {
  const cowId = typeof id === 'string' ? Number(id) : id

  const [cow, setCow] = useState<Cow | null>(null)
  const [categoryName, setCategoryName] = useState<string>('Loading...')
  const [ownerName, setOwnerName] = useState<string>('Loading...')
  const [cartSuccess, setCartSuccess] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState<string | null>(null)
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null)
 

  useEffect(() => {
    if (!cowId || isNaN(cowId)) return 

    const fetchCow = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/cows/byid`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: cowId }),
        })
        if (!res.ok) throw new Error('Failed to fetch cow')
        const data: Cow = await res.json()
        setCow(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCow()
  }, [cowId])

  useEffect(() => {
    if (!cow?.category) return

    const fetchCategory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/categories/byid`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: cow.category }),
        })
        if (!res.ok) throw new Error('Failed to fetch category')
        const data: Category = await res.json()
        setCategoryName(data.name)
      } catch (error) {
        console.error(error)
        setCategoryName('Unknown')
      }
    }
    fetchCategory()
  }, [cow?.category])

  useEffect(() => {
    if (!cow?.owner) return

    const fetchOwner = async () => {
      try {
        const res = await fetch(`${BASE_URL}/user/namebyid` ,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: cow.owner }),
        })
        if (!res.ok) throw new Error('Failed to fetch owner')
        const data: Owner = await res.json()
        setOwnerName(data.fullnames)
      } catch (error) {
        console.error(error)
        setOwnerName('Unknown')
      }
    }
    fetchOwner()
  }, [cow?.owner])

  if (!cow) return <div></div>

  const hasDiscount = parseFloat(cow.discount) > 0

  const handleAddToCart = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/cart/insert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 1, cow_id: cow.id }),
    });
    if (!res.ok) throw new Error('Failed to add to cart');
    setModalMessage('Added to cart successfully!');
    setModalType('success');
    setShowModal(true);
    setTimeout(() => setShowModal(false), 4000);
  } catch (error) {
    setModalMessage('Failed to add cow to cart!');
    setModalType('error');
    setShowModal(true);
    setTimeout(() => setShowModal(false), 4000);
  }
};


  return (
    <div className="w-[40%] flex justify-between h-[80%] rounded-3xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="w-[48%] bg-[rgb(216,209,209)] flex flex-col justify-center h-100 rounded-3xl">
        <div className="w-full mt-[5%] ml-5 flex-col items-start flex font-bold h-[15%]">
          <p className="text-2xl">{cow.name}</p>
          <p className='font-normal'>{cow.description}</p>
        </div>
        <div className="w-full ml-5 flex items-center gap-4 h-[8%] font-bold">
          {hasDiscount ? (
            <>
              <p className="text-xl text-red-500 line-through opacity-70" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                ${cow.price}
              </p>
              <p className="text-xl text-green-600 bg-green-100 px-3 py-1 rounded-lg shadow-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                ${cow.discount}
              </p>
            </>
          ) : (
            <p className="text-xl text-green-600 bg-green-100 px-3 py-1 rounded-lg shadow-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              ${cow.price}
            </p>
          )}
        </div>
        <div className="w-full ml-5 h-[8%] flex items-center">
          <Dot className="w-13 h-13 text-black-500" />
          <p className="font-normal">Age: {cow.age} years</p>
        </div>
        <div className="w-full ml-5 h-[8%] flex items-center">
          <Dot className="w-13 h-13 text-black-500" />
          <p className="font-normal">Category: {categoryName}</p>
        </div>
        <div className="w-full ml-5 h-[8%] flex items-center">
          <Dot className="w-13 h-13 text-black-500" />
          <p className="font-normal">Owner: {ownerName}</p>
        </div>
        <div className="w-full ml-5 h-[8%] flex items-center">
          <Dot className="w-13 h-13 text-black-500" />
          <p className="font-normal">Weight: {cow.weight} Kg</p>
        </div>
        <div className="w-full ml-5 h-[8%] flex items-center">
          <Dot className="w-13 h-13 text-black-500" />
          <p className="font-normal">Health Status: {cow.health_status}</p>
        </div>
        <div className="w-full ml-5 h-[8%] flex items-center">
          <Dot className="w-13 h-13 text-black-500" />
          <p className="font-normal">Breed: {cow.breed}</p>
        </div>

        <div className="w-[40%] ml-5 h-[8%] flex items-center justify-center rounded-xl">
          <div className="w-[15%] bg-green-500 rounded-full flex justify-center items-center h-[60%]">
            <Check className="text-white font-bold w-5 h-5" />
          </div>
          <p className="text-black font-bold ml-2">{cow.purchase_status}</p>
        </div>

        <div className="w-[80%] rounded-lg ml-5 h-[12%] flex items-center justify-center bg-green-600 hover:bg-green-700 cursor-pointer transition-colors">
          <Phone className="text-white w-5 h-5 mr-2" />
          <button className="text-white font-semibold text-lg">Contact Seller</button>
        </div>
      </div>

      <div className="w-[48%] bg-[rgb(216,209,209)] flex justify-center flex-col h-100 rounded-3xl" style={{ fontFamily: "'Courier New', monospace" }}>
        <div className="w-full h-[5%]">
          <p className="ml-[7%]">Total price</p>
        </div>
        <div className="w-full flex items-center h-[8%]">
          <p className="ml-[7%] font-bold text-2xl">${hasDiscount ? cow.discount : cow.price}</p>
        </div>
        <div className="w-full h-[8%] flex items-center justify-start rounded-xl">
          <div className="w-[5%] ml-[7%] bg-green-500 rounded-full flex justify-center items-center h-[60%]">
            <Check className="text-white font-bold w-5 h-5" />
          </div>
          <p className="text-black font-bold ml-2">{cow.purchase_status}</p>
        </div>
        <div
          onClick={handleAddToCart}
          className="w-[86%] h-[9%] ml-[7%] rounded-lg flex justify-center items-center bg-green-500 hover:bg-blue-700 cursor-pointer transition-colors"
        >

            {showModal && modalMessage && modalType && (
              <Modal onClose={() => setShowModal(false)}>
                {modalType === 'success' && (
                  <div className="w-100 h-12 flex justify-center items-center">
                    <div className="w-[10%] flex justify-center items-center rounded-full bg-green-500 h-[83%]">
                      <Check className="text-white" />
                    </div>
                    <div className="w-[85%] flex items-center ml-3 h-full">
                      <p className="font-bold">Added to cart successfully!</p>
                    </div>
                  </div>
                )}
            
                {modalType === 'error' && (
                  <div className="w-100 h-12 flex justify-center items-center">
                    <div className="w-[10%] flex justify-center items-center rounded-full bg-red-500 h-[83%]">
                      <X className="text-white" />
                    </div>
                    <div className="w-[85%] flex items-center ml-3 h-full">
                      <p className="font-bold">Failed to add cow to cart !</p>
                    </div>
                  </div>
                )}
              </Modal>
            )}





          <button className="text-white font-bold text-sm">
            {cartSuccess === true
              ? 'Added to Cart'
              : cartSuccess === false
              ? 'Failed to Add'
              : 'Add to Cart'}
          </button>
        </div>

        <div className="w-[86%] h-[9%] ml-[7%] mt-3 rounded-lg flex justify-center items-center bg-orange-500 hover:bg-blue-700 cursor-pointer transition-colors gap-2">
          <CreditCard className="text-white w-6 h-6" />
          <button className="text-white font-bold text-sm">Buy With Momo</button>
        </div>

        <div className="w-[86%] h-[9%] ml-[7%] mt-3 rounded-lg flex justify-center items-center bg-green-600 hover:bg-green-800 cursor-pointer transition-colors gap-2">
          <Clock className="text-white w-6 h-6" />
          <button className="text-white font-bold text-sm">Quick Order 24/7</button>
        </div>
      </div>
    </div>
  )
}

export default Rightcowcard
