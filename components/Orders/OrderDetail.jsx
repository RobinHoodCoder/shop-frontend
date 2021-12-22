import React from 'react';
import { Q_SINGLE_ORDER } from '../../gql/queries';
import { useQuery } from '@apollo/client';

const OrderDetail = ({ orderId }) => {
  const { data, loading, error } = useQuery(Q_SINGLE_ORDER, {
    variables: {
      id: orderId,
    },
  });

  console.log(data, loading, error);

  return (
    <div>

    </div>
  );
};

export default OrderDetail;
