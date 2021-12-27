import React from 'react';
import OrderDetail from '../../components/Orders/OrderDetail';

const OrderPage = ({ query }) => {
  const { orderId } = query;
  if (!!orderId) {
    return (
      <OrderDetail orderId={orderId} />
    );
  }
  return (
    <div>
      <h1>Order Page</h1>
    </div>
  );
};

export default OrderPage;
