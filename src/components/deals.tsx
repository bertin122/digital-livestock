import React, { useEffect, useState } from 'react';
import { Check, Dot } from 'lucide-react';
import { BASE_URL } from '../constants/urls';
import { useNavigate } from 'react-router-dom';

const CowCard = () => {
  const [cow, setCow] = useState<any>(null);
  const [ownerName, setOwnerName] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/cows/byid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 1 }),
    })
      .then(res => res.json())
      .then(async (data) => {
        setCow(data);

        if (data.owner) {
          const ownerRes = await fetch(`${BASE_URL}/user/namebyid`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: data.owner }),
          });
          const ownerData = await ownerRes.json();
          setOwnerName(ownerData.fullnames || 'Unknown');
        }

        if (data.category) {
          const categoryRes = await fetch(`${BASE_URL}/api/categories/byid`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: data.category }),
          });
          const categoryData = await categoryRes.json();
          setCategoryName(categoryData.name || 'Unknown');
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (!cow) return null;

  const discountPercent = cow?.price && cow?.discount
    ? Math.round(((Number(cow.price) - Number(cow.discount)) / Number(cow.price)) * 100)
    : 0;

  return (
    <div className='w-[90%] flex  h-[50%] items-center justify-between  mt-[2%] ml-[5%]'>
      <div className='w-[70%]  h-full flex flex-col justify-between'>
        <div className='w-full  flex items-center h-20 bg-green-500 rounded-2xl'>
          <p className='ml-[3%] text-white font-bold text-2xl'> DEALS OF THE DAY</p>
        </div>

        <div className='w-full  mt-2 h-120 justify-between rounded-3xl flex'>
          <div
            className='w-[69%] rounded-3xl h-full'
            style={{
              backgroundImage: `url(${cow?.photos?.[0]})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='w-[15%] h-[13%] p-0 items-center justify-center flex flex-col ml-[2%] rounded-xl mt-[2%] bg-green-500'>
              <p className='font-bold p-0 text-md text-white'>Save</p>
              <p className='text-white p-0 text-md font-bold'>-{discountPercent}%</p>
            </div>
          </div>

          <div className='w-[29%] rounded-3xl bg-white h-full'>
            <div className='w-full mt-[5%] ml-5 flex-col items-start flex font-bold h-[15%]'>
              <p className='text-2xl'>{cow?.name}</p>
              <p>{cow?.description}</p>
            </div>

            <div className="w-full ml-5 flex items-center gap-4 h-[8%] font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
               <p className="text-xl text-red-500 line-through opacity-70">
                 ${cow?.price}
               </p>
               <p className="text-xl text-green-600 bg-green-100 px-3 py-1 rounded-lg shadow-sm">
                 ${cow?.discount}
               </p>
            </div>

            <div className='w-ful ml-5 h-[8%] flex items-center'>
              <Dot className="w-13 h-13 text-black-500" /> <p className='font-bold'> Age: {cow?.age} years</p>
            </div>
            <div className='w-ful ml-5 h-[8%] flex items-center'>
              <Dot className="w-13 h-13 text-black-500" /> <p className='font-bold'> Category: {categoryName}</p>
            </div>
            <div className='w-ful ml-5 h-[8%] flex items-center'>
              <Dot className="w-13 h-13 text-black-500" /> <p className='font-bold'> Owner: {ownerName}</p>  
            </div>
            <div className='w-ful ml-5 h-[8%] flex items-center'>
              <Dot className="w-13 h-13 text-black-500" /> <p className='font-bold'> Weight: {cow?.weight}Kg</p>
            </div>
            <div className='w-ful ml-5 h-[8%] flex items-center'>
              <Dot className="w-13 h-13 text-black-500" /> <p className='font-bold'> Health_status: {cow?.health_status}</p>
            </div>
            <div className='w-ful ml-5 h-[8%] flex items-center'>
              <Dot className="w-13 h-13 text-black-500" /> <p className='font-bold'> Breed: {cow?.breed}</p>
            </div>

            <div className='w-[40%] ml-5 h-[8%]   flex items-center  justify-center rounded-xl'>
                 <div className='w-[20%] bg-green-500 rounded-full flex justify-center items-center h-[80%]'>
                      <Check className="text-white font-bold w-5 h-5" />
                 </div>
                 <p className='text-black font-bold ml-2'>{cow?.purchase_status}</p>
            </div>

            <div className='w-full ml-5 h-[14%] mt-[1%] flex justify-start items-center'>
              <button className="h-[70%] w-[40%] bg-black text-white rounded-xl"  onClick={() => navigate('/cow/1')}>Add to Cart</button>
              <button className="h-[70%] w-[40%] ml-3 bg-black text-white rounded-xl" onClick={() => navigate('/cow/1')}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-[29%]  h-142 flex flex-col justify-between '>
        <div
          className='w-full h-[48%]  rounded-3xl'
          style={{
            backgroundImage: `url(${cow?.photos?.[1]})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>

        <div
          className='w-full h-[48%]  rounded-3xl'
          style={{
            backgroundImage: `url(${cow?.photos?.[2]})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      </div>
    </div>
  );
};

export default CowCard;
