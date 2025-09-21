import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]); // ✅ correct useState

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]); // ✅ use products as dependency

  return (
    <div className='my-10'>
      <div className='text-center md:py-8 md:text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='md:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 mb-6'>
         The latest clothing collection blends contemporary trends with timeless elegance, featuring bold colors, sustainable fabrics, and versatile silhouettes.

        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <ProductItems
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            className="border border-black"
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
