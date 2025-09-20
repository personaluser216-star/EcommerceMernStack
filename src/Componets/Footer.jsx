import React from 'react';
import { assets } from '../assets/assets';

export const Footer = () => {
  return (
    <div className='mt-40 text-sm'>
      {/* 3-column grid layout */}
      <div className='grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10'>
        <div>
          <img src={assets.logo} className='w-32 mb-5' alt='logo' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab recusandae adipisci beatae saepe.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>Collection</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Get In Touch</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-222-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr className='my-5' />
      <p className='text-center text-sm pb-5'>
        © 2025 foreveryou.com – All Rights Reserved.
      </p>
    </div>
  );
};
