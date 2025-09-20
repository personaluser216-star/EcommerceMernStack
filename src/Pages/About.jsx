import React from 'react'
import Title from '../Componets/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from "../Componets/NewsLetterBox";

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='my-6 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[550px]' src={assets.about_img} alt='' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.

          </p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.

          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.

          </p>
        </div>


      </div>
      <div className='text-2xl  pt-8 '>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className='flex md:flex-row flex-col'>
        <div className='border border-gray-200 md:p-16 p-6'>
          <p className='text-md'>Quality Assurance:</p>
          <div className='text-gray-500 pt-6 text-sm'>We meticulously select and vet each product to ensure it meets our stringent quality standards.

          </div>

        </div>
        <div className='border border-gray-200 md:p-16 p-6'>
          <p className='text-md'>Convenience:</p>
          <div className='text-gray-500 pt-6 text-sm'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.

          </div>

        </div>
        <div className='border border-gray-200 md:p-16 p-6'>
          <p className='text-md'>Exceptional Customer Service:</p>
          <div className='text-gray-500 pt-6 text-sm'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.

          </div>

        </div>
      </div>
<div className="md:mt-20 mt-8">
  <NewsLetterBox/>
</div>
    </div>
  )
}

export default About