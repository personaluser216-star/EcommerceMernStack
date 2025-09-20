import React, { useContext, useState } from 'react';
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const Navigate = useNavigate()

  const{setShowsearch,getCartCount,token,setToken,setCartItems}=useContext(ShopContext);

  const logout = () =>
  {
    Navigate("/login")
    localStorage.removeItem('token')
    setToken('');
    setCartItems({})
    
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium relative'>
      {/* Logo */}
      <Link to="/">
      <img src={assets.logo} alt='logo' className='w-36' />
      </Link>

      {/* Desktop Menu */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {["/", "/collection", "/about", "/contact"].map((path, index) => {
          const names = ["Home", "Collection", "About", "Contact"];
          return (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${isActive ? 'text-black font-semibold' : ''}`
              }
            >
              <p>{names[index]}</p>
              <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${window.location.pathname === path ? 'block' : 'hidden'}`} />
            </NavLink>
          );
        })}
      </ul>

      {/* Icons */}
      <div className='flex items-center md:gap-6 gap-3'>
        <img 
        onClick={()=>setShowsearch(true)}
        src={assets.search_icon} className='w-5 cursor-pointer' alt='search' />

        {/* Profile dropdown */}
        <div className='group relative'>
          <Link to="/login">
          <img 
          onClick={()=> token ? null :Navigate("/login")}
          src={assets.profile_icon} className='w-5 cursor-pointer' alt='profile' /></Link>
          {
            token && 
             <div className='hidden group-hover:block absolute right-0 pt-4 z-10'>
            <div className='flex flex-col gap-1 w-32 bg-white shadow-md text-gray-500 rounded p-2'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p 
              onClick={()=>Navigate("/orders")}
              className='cursor-pointer hover:text-black'>Orders</p>
              <p
              onClick={logout}
              className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
          }
         
        </div>

        {/* Cart */}
        <Link to="/cart" className='relative'>
          <img src={assets.cart_icon} alt='cart' className='w-5 min-w-5' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center text-white leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Menu */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 md:hidden block cursor-pointer'
          alt='menu'
        />
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`fixed top-0 right-0 h-full z-20 bg-white shadow-lg transition-all duration-300 ${visible ? 'w-full px-6 py-5' : 'w-0 px-0 py-0 overflow-hidden'}`}>
        <div onClick={() => setVisible(false)} className='flex items-center gap-2 mb-6 cursor-pointer'>
          <img src={assets.dropdown_icon} className='h-4 rotate-180' alt='back' />
          <p>Back</p>
        </div>
        <nav className='flex flex-col gap-4 text-gray-700 text-base'>
          <NavLink to="/" onClick={() => setVisible(false)}>Home</NavLink>
          <NavLink to="/collection" onClick={() => setVisible(false)}>Collection</NavLink>
          <NavLink to="/about" onClick={() => setVisible(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setVisible(false)}>Contact</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
