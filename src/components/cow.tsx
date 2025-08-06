import React from 'react'

const cow = () => {
  return (
  <div className='w-70 border rounded-2xl'>
  
  <div className='relative h-[300px]'>
    <div className='absolute z-20 bg-green-500 rounded-xl flex justify-center items-center w-[17%] h-[25%] top-0 left-0'>
      <p className='text-white font-bold'>-20%</p>
    </div>
    <div className='absolute z-10 w-[90%] left-[5%] top-[20%] rounded-2xl border h-[50%] rounded-lg'>
      <img
        src='https://res.cloudinary.com/dlezmeikx/image/upload/v1754326806/240_F_287977752_atvG6IdCUCtu7nN6VfrOs3mSNwbXIFSj_quiapw.jpg'
        className='object-cover w-full h-full rounded-2xl'
      />
    </div>
  </div>

  
  <div>
    <p>third</p>
  </div>
</div>



  )
}

export default cow