import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const {token,setCartItems,backendurl} = useContext(ShopContext)
    const [serchParams,setSerachParams] = useSearchParams()

    const success = serchParams.get('success')
    const orderId = serchParams.get('orderId')
    const navigate = useNavigate();
    const verifyPayment = async()=>
    {
        try {
            if(!token)
            {
                return null;
            }

            const response = await axios.post(backendurl + "/order/verifyStripe",{success,orderId},{headers:{token}})

            if(response.data.success)
            {
                setCartItems({})
                navigate("/orders")
            }
            else
            {
                navigate('/cart')
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>
    {
        verifyPayment()
    },[token])
  return (
    <div>Verify</div>
  )
}

export default Verify