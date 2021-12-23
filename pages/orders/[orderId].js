import React from 'react';
import OrderDetail from '../../components/Orders/OrderDetail';

const OrderPage = ({ query }) => {
  const { orderId } = query;
  return (
    <OrderDetail orderId={orderId}/>
  );
};

export default OrderPage;
