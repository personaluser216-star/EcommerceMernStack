import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SerachBar = () => {

    const {search,showsearch,setSearch,setShowsearch} = useContext(ShopContext);
    const [visible,setVisible] =useState(false);
    const location = useLocation();


    useEffect(()=>
    {
        if(location.pathname.includes('collection') )
        {
            setVisible(true)
        }
        else
        {
            setVisible(false)
        }
    },[location])

  return showsearch  && visible? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full'>

            <input type='text' placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
            <img src={assets.search_icon} className='w-4' alt=''/>
        </div>
        <img src={assets.cross_icon} className='inline w-3 cursor-pointer' alt=''
        onClick={()=>setShowsearch(false)}
        />
    </div>
  ): null
}

export default SerachBar