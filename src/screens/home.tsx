import React from 'react'
import { Search } from 'lucide-react';
import CenterBanner from '../components/centerbanner';
import Rightbanner from '../components/rightbanner';
import Categorycard from '../components/categorycard';
import CowCard from '../components/deals';
import { Categorydiscount } from '../components/categorydiscount';

import Cowsrow from '../components/cowsrow';

const Home = () => {
  return (
   <div className="bg-[rgb(216,209,209)] w-full h-700 flex flex-col overflow-y-auto">


        <div className='w-full  border-red-800 h-[7%]'>
                 {/* insert header */}
        </div>
        <div className='h-80 w-full bg-green-500'>
            
         <div className='w-[88%] ml-[6%] h-[100%]  border-red-400 bg-green-500 flex justify-between items-center'>
         
            <div className='w-[30%] h-[60%]  border-red-500 rounded-3xl justify-between flex items-center bg-white'>
             <div className='w-[41%]  border-red-400 h-full rounded-l-3xl flex items-center'>
                     <select
                       className="w-full h-full rounded-l-3xl px-4 text-sm border-none outline-none cursor-pointer"
                       defaultValue="all"
                     >
                       <option value="all">all categories</option>
                       <option value="cat1">Category 1</option>
                       <option value="cat2">Category 2</option>
                       <option value="cat3">Category 3</option>
                     </select>
             </div>
             <div className='w-[47%]  border-red-400 h-full'>
                <input 
                  type="text" 
                  className="w-full h-full px-3 py-2 text-sm outline-none border-none"
                  placeholder="Search cows"
                />
             </div>
             <div className=' border-red-400 w-[12%] h-full rounded-r-3xl flex items-center justify-center'>

                  <Search size={20}/>
             </div>




            </div>
            <div className=' border-red-400 w-[20%] h-[60%] flex justify-center items-center ' > 
                  <p className='font-bold text-lg text-white'>Free Shopping Over Sytem</p>
            </div>
            <div className=' border-red-400 w-[20%] h-[60%] flex justify-center items-center ' > 
                  <p className='font-bold text-lg text-white'>30 Days Money Back</p>
            </div>
            <div className=' border-red-400 w-[20%] h-[60%] flex justify-center items-center ' > 
                  <p className='font-bold text-lg text-white'>100 secure Payment</p>
            </div>
            <button className="relative inline-flex items-center gap-2  text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className="h-6 w-6 text-white"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
               >
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h11.1M7 13L5.4 5H3" />
               </svg>
             
               <span className="text-sm font-semibold">Cart</span>
             
               {1 > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-full font-bold rounded-full px-1.5">
                   7
                 </span>
               )}
           </button>



            </div>
        </div>
        <div className='h-[60%]   ml-[5%] mt-[1%] w-[90%]  border-red-500 justify-between flex '>

            <Categorydiscount/>
            <CenterBanner/>
            <Rightbanner/>


        </div>
        <div className='w-[90%] ml-[5%] mt-[1%]  h-[20%]'>
            <div className='w-full font-bold text-black flex items-center h-[20%] '>
                <p>Top Categories</p>
            </div>
            

               <Categorycard/>

            </div>
            <CowCard/>
            <div className='w-[90%] ml-[5%] mt-[2%]  '>
                  <div className='bg-green-500 flex items-center rounded-2xl w-full h-20'>
                      <p className='ml-[3%] text-white font-bold text-2xl'>ALL CATEGORIES</p>
                  </div>
                 <Cowsrow/>
               
            </div>
            <div className='w-full border h-[40%] mt-[2%]'>

            </div>
            
        </div>
      
    
    )
}

export default Home