import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../Componets/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [sizes, setSizes] = useState('');

  const fetchProductData = () => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Image Section */}
        <div className='flex-1 flex sm:flex-row flex-col-reverse gap-3'>

          {/* Desktop Thumbnails (left side) */}
          <div className='hidden sm:flex flex-col overflow-y-scroll sm:w-[18.7%] gap-2'>
            {productData.image.map((item, index) => (
              <img
                src={item}
                alt=''
                key={index}
                onClick={() => setImage(item)}
                className='w-full h-auto object-cover cursor-pointer hover:opacity-80 border'
              />
            ))}
          </div>

          {/* Main Image */}
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto object-cover' alt='' />

            {/* Mobile Thumbnails (below main image) */}
            <div className='flex flex-row sm:hidden overflow-x-auto gap-2 mt-3'>
              {productData.image.map((item, index) => (
                <img
                  src={item}
                  alt=''
                  key={index}
                  onClick={() => setImage(item)}
                  className='w-16 h-16 object-cover cursor-pointer hover:opacity-80 flex-shrink-0 border'
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl md:mt-2 mt-1'>{productData.name}</h1>

          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_dull_icon} alt='' className='w-3.5' />
            <p className='pl-2'>(122)</p>
          </div>

          <p className='mt-2 text-2xl font-medium'>
            {currency}
            {productData.price}
          </p>

          <p className='md:mt-5 mt-2 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Sizes */}
          <div className='flex flex-col gap-4 md:my-8 my-4'>
            <p>Select size</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSizes(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === sizes ? 'border-orange-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, sizes)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of
            products or services over the internet. It serves as a virtual marketplace where
            businesses and individuals can showcase their products, interact with customers, and
            conduct transactions without the need for a physical presence.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed
            descriptions, images, prices, and any available variations (e.g., sizes, colors). Each
            product usually has its own dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
