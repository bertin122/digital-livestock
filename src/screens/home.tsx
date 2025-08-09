import React from 'react'
import { Search } from 'lucide-react';
import CenterBanner from '../components/centerbanner';
import Rightbanner from '../components/rightbanner';
import Categorycard from '../components/categorycard';
import CowCard from '../components/deals';
import { Categorydiscount } from '../components/categorydiscount';

import Cowsrow from '../components/cowsrow';
import Header from '../components/header';

const Home = () => {
  return (
   <div className="bg-[rgb(216,209,209)] w-full h-auto flex flex-col overflow-y-auto">


        <Header/>
        
        <div className='h-130   ml-[5%] mt-[1%] w-[90%]  border-red-500 justify-between flex '>

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