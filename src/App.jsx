import React from 'react';
import Home from './Pages/Home';
import About from './Pages/About';
import Collection from "./Pages/Collection";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Navbar from './Componets/Navbar';
import PlaceOrder from './Pages/PlaceOrder'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ShopContextProvider from './Context/ShopContext'; 
import { Footer } from './Componets/Footer';
import SerachBar from './Componets/SerachBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './Pages/Orders';
import Verify from './Pages/Verify';

const App = () => {
  return (
    <ShopContextProvider> {/* ✅ wrap entire app */}
      <div className='pt-2 pl-8 pr-8'>
        <BrowserRouter>
        <ToastContainer/>
          <Navbar />
          <SerachBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/verify' element={<Verify/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </ShopContextProvider>
  );
};

export default App;
