import React from 'react';
import { useQuery } from '@apollo/client';
import { Q_ALL_ORDERS } from '../../gql/queries';
import styled from 'styled-components';
import formatMoney from '../../lib/formatMoney';
import ProductImage from '../ProductImage/ProductImage';

const Order = styled.div`
  border-radius: 15px;
  padding: 1rem .6rem;
  box-shadow: 1px 3px 4px 2px rgba(0, 0, 0, 0.26);
  &:not(:last-of-type) {
    margin-bottom: .5rem;
  }
`;

const OrderItem = styled.div`
 border-bottom: 1px solid var(--blue);
  color: var(--black);
  padding: .5rem .3rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  img {
    max-width: 100px;
    align-self: flex-end;
  }
  &:not(:last-of-type) {
    margin-bottom: .5rem;
  }
`;

const OrderList = () => {
  const { data, loading, error } = useQuery(
    Q_ALL_ORDERS
  );
  const { allOrders } = data || {};


  return (
    <div>
      {!allOrders?.length && (
        <p>No orders found</p>
      )}
      {
        allOrders?.map?.((order) => {
          const { id, items } = order;
          return (
            <Order key={id}>
              <h2>Id: {id}</h2>
              {items.map((orderItem) => {
                const { id, name, price, quantity, photo } = orderItem;
                return (
                  <OrderItem key={id}>
                    <div>
                      <h2>{name}</h2>
                      <p>{quantity} &times;</p>
                      <span>{formatMoney(price)}</span>
                    </div>
                    <ProductImage photo={photo}/>
                  </OrderItem>
                );
              })}
            </Order>
          );
        })
      }
    </div>
  );
};

export default OrderList;
