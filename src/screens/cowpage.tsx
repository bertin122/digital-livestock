import { useParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import Categorycard from '../components/categorycard'
import Cowsrow from '../components/cowsrow'
import Cowimages from '../components/cowimages'
import Rightcowcard from '../components/rightcowcard'
import Recentlyviewed from '../components/recentlyviewed'
import Header from '../components/header'

const CowPage = () => {
  const { id } = useParams<{ id: string }>()
  const cowId = id ? Number(id) : null

  return (
    <div className="bg-[rgb(216,209,209)] w-full h-auto flex flex-col overflow-y-auto">
      

      <Header/>
      <div className="h-auto p-15 bg-white gap-5 rounded-3xl items-center ml-[5%] mt-[1%] w-[90%] border-red-500 justify-center flex">
        {cowId !== null && (
          <>
            <Cowimages id={cowId} />
            <Rightcowcard id={cowId} />
          </>
        )}
      </div>

      <div className="w-[90%] ml-[5%] mt-[1%] h-[20%]">
        <div className="w-full  flex items-center font-bold h-15">
          <p>Your Recently Viewed</p>
        </div>
        <Recentlyviewed />
        <div className="w-full  font-bold text-black mt-[1%] flex items-center h-15">
          <p>Top Categories</p>
        </div>
        <Categorycard />
      </div>

      <div className="w-[90%] ml-[5%] mt-[2%]">
        <div className="bg-green-500   flex items-center rounded-2xl w-full h-20">
          <p className="ml-[3%] text-white font-bold text-2xl">ALL CATEGORIES</p>
        </div>
        <Cowsrow />
      </div>

      <div className="w-full   mt-[2%]">
        
      </div>
    </div>
  )
}

export default CowPage
