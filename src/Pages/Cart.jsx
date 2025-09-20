import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Componets/Title";
import { assets } from "../assets/assets";
import CartTotal from "../Componets/CartTotal"; 
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: quantity,
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"your"} text2={"cart"} />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
      ) : (
        <div>
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) return null;

            return (
              <div
                key={index}
                className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={productData.image[0]}
                    className="w-16 sm:w-20"
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg">{productData.name}</p>
                    <p className="text-xs text-gray-500">Size: {item.size}</p>
                    <p className="text-sm">
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>

                <input
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value < 1 || isNaN(value)) return;
                    updateQuantity(item._id, item.size, value);
                  }}
                  type="number"
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  min={1}
                  defaultValue={item.quantity}
                />

                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  alt="delete"
                />
              </div>
            );
          })}

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button 
                onClick={()=>navigate('/place-order')}
                className="bg-black text-white text-sm my-8 py-3 p-2">PROCESED TO CHECKOUT</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
