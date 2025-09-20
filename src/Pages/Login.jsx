import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [currentState,setCurrentState] = useState('Login');
  const {token,setToken,backendurl} = useContext(ShopContext);
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail] =useState("");
  const navigate = useNavigate()

  const OnSubmitHandler = async (event) =>
  {
    event.preventDefault();
    try {
      if(currentState === 'Sign Up')
      {
        const response = await axios.post(backendurl + '/user/register',{name,email,password});
        if(response.data.success)
        {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else
        {
          toast.error(response.data.message)
        }
      }
      else
      {
        const response = await axios.post(backendurl +'/user/login',{email,password})
        if(response.data.success)
        {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else
        {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }

  }
  useEffect(()=>
  {
    if(token)
    {
      navigate("/")
    }
  })

  return (
    <form  onSubmit={OnSubmitHandler}   className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4'>
      <div className='inline-flex items-center gap-=2 mb-2 mt-10'>
        <p className='prata-regular text-2xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Login'? '' :       <input type="text" onChange={(e)=>setName(e.target.value)}  value={name}  className='w-full px-3 py-2 border border-gray-800 '  placeholder='Name' required/>
}
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800 '  placeholder='Email' required/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)}  value={password} className='w-full px-3 py-2 border border-gray-800 '  placeholder='password' required/>
<div className='w-full flex justify-between text-sm mt-[-8px]'>
  <p className='cursor-pointer'>Forgot Password ?</p>
  {
    currentState === 'Login'
    ?  <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
    : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
  }

</div>
<button className='bg-black text-white font-light px-2 py-2  '>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>
    </form>
  )
}

export default Login