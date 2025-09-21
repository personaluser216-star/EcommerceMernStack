import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const navigate=useNavigate();

  return (
   <div className='flex flex-col sm:flex-row border border-gray-400'>
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-meduim text-sm md:text-base uppercase'> Our bestsellers</p>
          </div>
          <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            
            <button className='bg-[#414141] font-semibold text-sm md:text-base p-2 text-white'
            onClick={()=>navigate("/collection")}
            >Shop Now</button>
            <p className='w-8 md:[w-11] h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
      <div className='w-full sm:w-1/2'>
        <img src={assets.hero_img} className='w-full md:h-[520px] h-72 object-cover' alt='' />
      </div>
    </div>
  )
}

export default Hero