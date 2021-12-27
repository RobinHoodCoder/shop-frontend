import React from 'react';
import OrderList from '../components/Orders/OrderList';

const Orders = (props) => {
  const { dummy } = props;

  return (
    <div>
      <OrderList/>
    </div>
  );
};

export default Orders;
