import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from "../Componets/Title";
import ProductItem from "../Componets/ProductItems";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedproduct, setRelatedproduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter((item) => subCategory === item.subCategory);

      setRelatedproduct(productCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
      <div className='text-center text-2xl py-2'>
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {relatedproduct.map((item, index) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
