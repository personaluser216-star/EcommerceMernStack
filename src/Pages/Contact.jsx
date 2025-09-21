import React from 'react'
import Title from '../Componets/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../Componets/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className='md:my-10 my-6 flex flex-col justify-center md:flex-row gap-10 md:mb-28 mb-20'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt='' />
        <div className='flex flex-col justify-center items-start md:gap-6 gap-3'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Lower Barol,Dharmshala<br />
            Himachal pradesh</p>
          <p className='text-gray-500'>Tel: +91 9879952071 <br />Email: admin@forever.com

          </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 border'>Explore Jobs</button>
        </div>
      </div>
      <div>
        <NewsLetterBox/>
      </div>
    </div>
  )
}

export default Contact