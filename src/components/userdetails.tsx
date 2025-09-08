import React, { useEffect, useState } from 'react';
import Modal from '../modals/modal'; // adjust path
import { Check, X } from 'lucide-react';
import { BASE_URL } from '../constants/urls';


interface UserData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

const UserDetails: React.FC = () => {
  const [user, setUser] = useState<UserData>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null);

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

  const handleSave = async () => {
  try {
    const res = await fetch(`${BASE_URL}/user/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 1, ...user }),
    });

    const data = await res.json();

    if (res.ok) {
      setModalType('success');
      setModalMessage('User updated successfully!');
      setUser({ email: '', password: '', firstname: '', lastname: '' });
    } else {
      setModalType('error');
      setModalMessage(data.message || 'Failed to update user.');
    }

    setShowModal(true);

    setTimeout(() => setShowModal(false), 4000);

  } catch (error) {
    console.error('Error updating user:', error);
    setModalType('error');
    setModalMessage('An error occurred.');
    setShowModal(true);

    setTimeout(() => setShowModal(false), 4000);
  }
};


  return (
    <>
      <div className='flex w-full gap-2'>
        <div className='flex flex-col w-1/2'>
          <label className='mb-1 text-sm font-semibold'>First Name</label>
          <input
            type='text'
            value={user.firstname}
            onChange={e => setUser({ ...user, firstname: e.target.value })}
            className='w-full h-10 p-1 rounded-lg outline-none'
            style={{ border: '0.05px solid #ccc' }}
          />
        </div>
        <div className='flex flex-col w-1/2'>
          <label className='mb-1 text-sm font-semibold'>Last Name</label>
          <input
            type='text'
            value={user.lastname}
            onChange={e => setUser({ ...user, lastname: e.target.value })}
            className='w-full h-10 p-1 rounded-lg outline-none'
            style={{ border: '0.05px solid #ccc' }}
          />
        </div>
      </div>

      <div className='flex flex-col mt-2'>
        <label className='mb-1 text-sm font-semibold'>Email</label>
        <input
          type='email'
          value={user.email}
          onChange={e => setUser({ ...user, email: e.target.value })}
          className='w-full h-10 p-1 rounded-lg outline-none'
          style={{ border: '0.05px solid #ccc' }}
        />
      </div>

      <div className='flex flex-col mt-2'>
        <label className='mb-1 text-sm font-semibold'>Password</label>
        <input
          type='text'
          value={user.password}
          onChange={e => setUser({ ...user, password: e.target.value })}
          className='w-full h-10 p-1 rounded-lg outline-none'
          style={{ border: '0.05px solid #ccc' }}
        />
      </div>

      <button
        onClick={handleSave}
        className='bg-green-500 text-white w-[20%] font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors mt-4'
      >
        Save
      </button>

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
    </>
  );
};

export default UserDetails;
