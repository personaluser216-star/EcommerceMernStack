import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Componets/Title';
import axios from 'axios';

const Orders = () => {
  const { backendurl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [trackedIndex, setTrackedIndex] = useState(null); // Track which item is being tracked

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendurl + '/order/userorders',
        {},
        { headers: { token } }
      );

      const orders = response.data.orders || response.data.Orders;

      if (!orders) {
        console.error('Orders not found in response:', response.data);
        return;
      }

      let allOrdersItem = [];

      orders.forEach((order) => {
        order.items.forEach((item) => {
          allOrdersItem.push({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          });
        });
      });

      setOrderData(allOrdersItem.reverse());
    } catch (error) {
      console.error('Error loading orders:', error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const handleTrackClick = (index) => {
    setTrackedIndex(index);
    // If you want, you could re-fetch updated status here for that order item.
  };

  return (
    <div className="border-t pt-16 min-h-[80vh]">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {orderData.length === 0 ? (
        <div className="text-center mt-8 text-gray-600">
          You have no orders yet.
        </div>
      ) : (
        <div>
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* Item Info */}
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={
                    Array.isArray(item.image)
                      ? item.image[0]
                      : item.image ||
                        'https://res.cloudinary.com/dmbkn7s2h/image/upload/v1757998549/t0g8dmgcjnqssyr5xsip.png'
                  }
                  alt={item.name}
                  className="w-12 sm:w-16 object-cover rounded"
                />
                <div className="text-sm ">
                  <p>{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date:{' '}
                    <span className="text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </p>
                    <p className="mt-1">
                    Payment:{' '}
                    <span className="text-gray-400">
                     {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status and Tracking */}
              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      item.status === 'Delivered'
                        ? 'bg-green-500'
                        : item.status === 'Cancelled'
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    }`}
                    title={item.status}
                  ></span>
                  {/* Highlight status if this item is tracked */}
                  <p
  className={`text-sm capitalize ${
    trackedIndex === index ? 'font-bold text-blue-600' : ''
  }`}
>
  {item.status}
  {trackedIndex === index && ' (Latest Status)'}
</p>

                </div>
                <button
                  onClick={() => handleTrackClick(index)}
                  className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
