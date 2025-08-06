import React, { useEffect, useState } from 'react';
import { Dot } from 'lucide-react';
import { BASE_URL } from '../constants/urls';

const CowCard = () => {
  const [cow, setCow] = useState<any>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/cows/byid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 1 }),
    })
      .then((res) => res.json())
      .then((data) => setCow(data))
      .catch((err) => console.error(err));
  }, []);

  const discountPercent = cow?.price && cow?.discount
    ? Math.round(((Number(cow.price) - Number(cow.discount)) / Number(cow.price)) * 100)
    : 0;

  return (
    <div className='w-[90%] h-[50%] justify-between flex mt-[2%] ml-[5%]'>
      <div className='w-[70%] h-full mb-[3%] flex flex-col justify-between'>
        <div className='w-full flex items-center h-[15%] bg-green-500 rounded-2xl'>
          <p className='ml-[3%] text-white font-bold text-2xl'> DEALS OF THE DAY</p>
        </div>

        <div className='w-full h-[80%] justify-between rounded-3xl flex'>
          <div
            className='w-[69%] rounded-3xl h-full border'
            style={{
              backgroundImage: `url(${cow?.photos?.[0]})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='w-[15%] h-[13%] p-0 items-center flex flex-col ml-[2%] rounded-xl mt-[2%] bg-green-500'>
              <p className='font-bold p-0 text-md text-white'>Save</p>
              <p className='text-white p-0 text-md font-bold'>-{discountPercent}%</p>
            </div>
          </div>

          <div className='w-[29%] rounded-3xl bg-white h-full'>
            <div className='w-full mt-[5%] ml-5 flex-col items-start flex font-bold h-[15%]'>
              <p className='text-2xl'>{cow?.name}</p>
              <p>{cow?.description}</p>
            </div>

            <div className='w-full ml-5 flex justify-start items-center flex font-bold h-[8%]'>
              <p className='text-2xl line-through text-red-500'>${cow?.price}</p>
              <p className='ml-[5%] text-black text-2xl'>${cow?.discount}</p>
            </div>

            <div className='w-ful ml-5 h-[8%] flex items-center'>
              <Dot className="w-13 h-13 text-black-500" /> <p className='font-bold'> Age: {cow?.age} years</p>
            </div>
            <div className='w-ful ml-5 h-[8%] flex items-center'>
              <Dot className="w-13 h-13 text-black-500" /> <p className='font-bold'> Category: Cows</p>
            </div>
            <div className='w-ful ml-5 h-[8%] flex items-center'>
              <Dot className="w-13 h-13 text-black-500" /> <p className='font-bold'> Owner: Maurice</p>
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

            <div className='w-[40%] ml-5 h-[8%] flex items-center justify-center bg-green-500 rounded-xl'>
              <p className='text-white font-bold'>{cow?.purchase_status}</p>
            </div>

            <div className='w-full ml-5 h-[14%] mt-[1%] flex justify-start items-center'>
              <button className="h-[70%] w-[40%] bg-black text-white rounded-xl">Add to Cart</button>
              <button className="h-[70%] w-[40%] ml-3 bg-black text-white rounded-xl">Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-[29%] h-full flex flex-col justify-between '>
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
