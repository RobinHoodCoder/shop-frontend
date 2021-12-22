import React from 'react';
import PDP from '../../components/PDP/PDP';
import Page from '../../components/Page';
import { useQuery } from '@apollo/client';
import { Q_CURRENT_USER } from '../../gql/queries';
import OrderDetail from '../../components/Orders/OrderDetail';

const OrderPage = ({ query }) => {
  const { data, loading, error } = useQuery(Q_CURRENT_USER);
  console.log({ data, loading, error });

  const { orderId } = query;
  console.log(query);
  return (
    <OrderDetail orderId={orderId}/>
  );
};

export default OrderPage;
