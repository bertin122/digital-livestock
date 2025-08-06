import React from 'react'

const rightbanner = () => {
    const nn='>>'
  return (
   <div className='h-full  border-red-400 w-[20%] flex flex-col justify-between  '>
     <div className='h-[48.5%] w-full bg-white flex   rounded-3xl'>
           <div className='w-[50%] h-full '>
                <img
                src='https://res.cloudinary.com/dlezmeikx/image/upload/v1754512303/jersey-removebg-preview_acqc2c.png'
                className='object-cover w-full h-full '
                />
           </div>
           <div className='w-[50%] flex flex-col justify-center items-center h-full '>
               <p className='text-black font-bold  text-lg'>Explore New</p>
               <p className='text-black font-bold  text-lg'>  Young Jersey</p> 
               <p className='text-black font-bold  text-lg'>  Jerseys on 1.2M</p> 
               <div className='mt-[20%]'>
                <button className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-800 transition">
                  Explore {nn}
                </button>

              </div>
           </div>
           
     </div>

     
    <div  className="h-[48.5%] w-full  flex  rounded-3xl bg-[hsl(240,3.90%,20.00%)]  ">
               
              <div className=' w-[50%] h-full  justify-center  items-center flex flex-col rounded-3xl' >
                    <p className='text-white font-bold text-2xl'>Explore</p>
                    <p className='text-white font-bold text-2xl'>Discount</p>
                    <p className='text-white font-bold text-2xl'>Picks</p>
                    <div className='mt-[12%]'> 
                         <button className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition">
                            Explore {nn}
                         </button> 
                    </div>
              </div>
              <div className='w-[50%] h-full '>
                     <img 
                     src='https://res.cloudinary.com/dlezmeikx/image/upload/v1754513395/congo-removebg-preview_wssrq8.png'
                     className='w-full h-full object-cover'
                      />
              </div>
      </div>

                
   </div>
  )
}

export default rightbanner


