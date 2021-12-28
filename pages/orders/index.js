import React from 'react';
import OrderDetail from '../../components/Orders/OrderDetail';
import OrderList from '../../components/Orders/OrderList';

const OrderPage = ({ query }) => {
  const { orderId } = query;
  if (!!orderId) {
    return (
      <OrderDetail orderId={orderId} />
    );
  }
  return (
    <div>
      <h1>My orders</h1>
      <OrderList />
    </div>
  );
};

export default OrderPage;
