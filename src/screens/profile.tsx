import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { ChevronRight } from 'lucide-react';
import OrdersCard from '../components/orderscard';
import UserDetails from '../components/userdetails';
import { BASE_URL } from '../constants/urls';

interface UserData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserData>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });

  const [activeTab, setActiveTab] = useState<'account' | 'orders'>('account');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/user/namebyid`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: 1 }),
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: UserData = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="bg-[rgb(216,209,209)] w-full h-auto flex flex-col overflow-y-auto">
      <Header />

      <div className="p-12  bg-white gap-5 flex items-end rounded-3xl ml-[5%] mt-[1%] w-[90%] border-yellow-500 justify-between">
        
        {/* Left Sidebar */}
        <div className='w-[25%] flex flex-col items-start  rounded-2xl p-4 h-120 bg-white shadow-md'>
          
          <div className='w-[60%] rounded-2xl overflow-hidden  mb-4'>
            <img
              src='https://res.cloudinary.com/dlezmeikx/image/upload/v1755111372/profile_lzhjnt.png'
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </div>
        
          <div className='flex flex-col items-start mb-6'>
            <p className='font-bold text-lg'>{user.firstname} {user.lastname}</p>
            <p className='text-gray-500 text-sm'>{user.email}</p>
          </div>
        
          <div className='flex flex-col w-full gap-3'>
            
            <button
              onClick={() => setActiveTab('account')}
              className={`flex justify-between items-center w-full px-4 py-3 rounded-lg transition ${
                activeTab === 'account'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>Account Info</span>
              <ChevronRight size={20} />
            </button>
        
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex justify-between items-center w-full px-4 py-3 rounded-lg transition ${
                activeTab === 'orders'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>My Orders</span>
              <ChevronRight size={20} />
            </button>
        
          </div>
        </div>

        
        <div className='w-[70%]  h-120 p-4 flex flex-col justify-start gap-3 rounded-lg'>
          {activeTab === 'account' ? <UserDetails /> : <OrdersCard />}
        </div>
      </div>

      
      <div className="w-full mt-[2%]"></div>
    </div>
  );
};

export default Profile;
