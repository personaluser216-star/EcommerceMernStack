import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className='md:mt-40 mt-16 text-sm '>
      {/* 3-column grid layout */}
      <div className='grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10'>
        <div>
          <img src={assets.logo} className='w-32 md:mb-5 mb-3' alt='logo' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Here fashion should be bold, effortless, and made for real life. Our collections are designed with care, combining trend-forward styles with everyday versatility. Whether you're dressing up or keeping it casual, Prara helps you express your style with confidence.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium md:mb-5 mb-3'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
  <li>
    <Link to="/">Home</Link>
  </li>
  <li>
    <Link to="/collection">Collection</Link>
  </li>
  <li>
    <Link to="/about">About Us</Link>
  </li>
  <li>
    <Link to="/contact">Contact</Link>
  </li>
</ul>
        </div>

        <div>
          <p className='text-xl font-medium md:mb-5 mb-3'>Get In Touch</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 9879952071</li>
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
