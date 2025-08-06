import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constants/urls';

const CenterBanner = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
 const nn='>>';
  useEffect(() => {
    fetch(`${BASE_URL}/api/cows/byid`, {    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 2 }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Fetched cow data:', data);

        if (data.photos && data.photos.length > 0) {
          setPhotoUrl(data.photos[0]);
        }
      })
      .catch(err => console.error('Error fetching cow:', err));
  }, []);

  return (
   <div className="h-full w-[58%]   border-red-400 justify-between">
  <div className="h-[65%]  rounded-2xl flex justify-between items-center overflow-visible relative">
    <div className="w-[40%] h-full bg-[rgb(138,134,134)] rounded-l-2xl ">
      {/* left content */}
    </div>

    <div className="w-[60%] h-full bg-[rgb(138,134,134)] rounded-r-2xl  overflow-hidden relative">
      {photoUrl && (
        <img
          src={photoUrl}
          alt="Cow"
          className="w-full h-full object-cover rounded-r-2xl"
        />
      )}
    </div>

   
    <div
      className=" w-[30%] h-[80%]  items-center justify-around absolute flex flex-col top-1/2 left-[20%] translate-y-[-50%] z-20 rounded"
    >
        <div className='flex flex-col   w-full flex ml-[20%]' >
            <p className='text-white text-5xl font-bold '>Well Grown</p>
            <p className='text-white text-3xl'>Mountain Cow</p>
            

        </div>
        <div className=' w-[50%] '>
                  <p className='text-white text-lg  font-bold'>this cow is nature's calm heart</p>
        </div>
        <div className='w-full  ml-[20%] flex items-start' >
          <button
              className="bg-white text-black font-semibold px-8 py-2 rounded-lg transition duration-200
                shadow-[0_6px_10px_-2px_rgba(0,0,0,0.5),0_3px_6px_-1px_rgba(0,0,0,0.3)]
                hover:bg-gray-100"
            >
              BUY NOW
         </button>
        </div>
        
    </div>
  </div>
  <div className='w-full  flex justify-between items-end flex-1 h-[35%]'>
       <div className=' w-[49.2%] bg-white h-[92%] flex   rounded-3xl'>
           <div className='w-[50%] h-full  flex flex-col justify-center  items-center' >
                <p className='text-black font-bold text-xl'>Shop now from </p>
                <p className='text-black font-bold text-xl'>
                   your 300k
                </p>
                <div className='mt-[6%]'>
                    <button className="bg-black text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition">
                    DISCOVER {nn}
                </button>
                </div>
           </div>
           <div className='w-[50%] h-full rounded-3xl'>
             <img
              src="https://res.cloudinary.com/dlezmeikx/image/upload/v1754509895/redcalf-removebg-preview_w6lo8x.png"
              alt="Calf"
              className="w-full h-full object-cover rounded-3xl"
            />
         </div>
           
            
       </div>
       <div className=' w-[49.2%] bg-[rgb(138,134,134)] h-[92%] flex rounded-3xl'>
        <div className='w-[50%] h-full  flex flex-col justify-center  items-center'>
              <p className='text-white font-bold text-xl'>Best Picks From</p>
                <p className='text-white font-bold text-xl'>
                   your 800k
                </p>
                <div className='mt-[6%]'>
                    <button className="bg-white text-black font-bold px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition">
                    DISCOVER {nn}
                </button>
                </div>
        </div>
        <div className='w-[50%] h-full '>
             <img
             src='https://res.cloudinary.com/dlezmeikx/image/upload/v1754510544/blackcow-removebg-preview_iuymcn.png'
             alt='inyambo'
             className='w-full h-full object-cover rounded-3xl'
             />
        </div>
             
       </div>
  </div>
</div>




   
  );
};

export default CenterBanner;
