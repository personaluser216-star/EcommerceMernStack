import React, { useContext, useState } from 'react';
import Title from '../Componets/Title';
import CartTotal from '../Componets/CartTotal';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();

  const {
    backendurl,
    token,
    cartItems,
    setCartItems,
    getCountAmount,
    delivery_fee,
    products
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

 const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    const orderItems = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            orderItems.push({
              productId: product._id,
              name: product.name,
              size,
              quantity,
              price: product.price,
              image: product.image[0],
            });
          }
        }
      }
    }

    if (orderItems.length === 0) {
      toast.warning("Cart is empty.");
      return;
    }

    const orderData = {
      items: orderItems,
      amount: getCountAmount() + delivery_fee,
      address: {
        ...formData
      },
      paymentMethod: method,
    };

    if (method === 'stripe') {
      const response = await axios.post(`${backendurl}/order/stripe`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        window.location.href = response.data.session_url; // Redirect to Stripe Checkout
      } else {
        toast.error(response.data.message || "Stripe session failed.");
      }

    } else {
      // COD or other methods
      const response = await axios.post(`${backendurl}/order/place`, {
        ...orderData,
        payment: method === 'cod' ? false : true
      }, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success("Order placed successfully!");
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.message || "Failed to place order.");
      }
    }

  } catch (error) {
    console.error("Order Error:", error.message);
    toast.error("Something went wrong while placing the order.");
  }
};


  return (
    <form onSubmit={onSubmitHandler} className='md:pl-32 md:pr-32 flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* LEFT SIDE - ADDRESS */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className='flex gap-3'>
          <input required name='firstName' value={formData.firstName} onChange={onChangeHandler} placeholder='First name' className='border rounded py-1.5 px-3.5 w-full' />
          <input required name='lastName' value={formData.lastName} onChange={onChangeHandler} placeholder='Last name' className='border rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required name='email' type='email' value={formData.email} onChange={onChangeHandler} placeholder='Email address' className='border rounded py-1.5 px-3.5 w-full' />
        <input required name='street' value={formData.street} onChange={onChangeHandler} placeholder='Street' className='border rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input required name='city' value={formData.city} onChange={onChangeHandler} placeholder='City' className='border rounded py-1.5 px-3.5 w-full' />
          <input name='state' value={formData.state} onChange={onChangeHandler} placeholder='State' className='border rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler} placeholder='Zipcode' className='border rounded py-1.5 px-3.5 w-full' />
          <input required name='country' value={formData.country} onChange={onChangeHandler} placeholder='Country' className='border rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required name='phone' type='tel' value={formData.phone} onChange={onChangeHandler} placeholder='Phone' className='border rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* RIGHT SIDE - PAYMENT */}
      <div className='mt-8'>
        <div className='min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt='stripe' className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt='razorpay' className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-md mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
