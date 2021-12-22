import React from 'react';
import { Q_SINGLE_ORDER } from '../../gql/queries';
import { useQuery } from '@apollo/client';
import formatMoney from '../../lib/formatMoney';
import styled from 'styled-components';

const OrderItemStyles = styled.div`
  padding: .5rem;
  display: grid;
    grid-template-columns: 1fr 1fr;

 &:not(:last-child) {
     border-bottom: 1px solid #000;
 }
  .price {
    font-size: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  img {
    width: 80%;
    height: 200px;
    object-fit: cover;
    margin-left: auto
  }
  .img-container{
    text-align: right
  }
`;
const OrderContainerStyles = styled.div`
  border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
`;

const OrderDetail = ({ orderId }) => {
  const { data, loading, error } = useQuery(Q_SINGLE_ORDER, {
    variables: {
      id: orderId,
    },
  });

  const { Order } = data || {};

  return (
    <OrderContainerStyles>
      {
        Order && (
          Order.items.map((item, i) => {
            const { altText: alt, image } = item.photo;
            const { publicUrlTransformed: src } = image;
            console.log(item);
            return (
              <OrderItemStyles key={`${item.id}${i}`}>
                <div>
                  <h2>{item.name}</h2>
                  <span className="price">
                    {item.quantity} &times;  {formatMoney(item.price)}
                  </span>
                  <p>{item.description}</p>
                  <p>
                  </p>
                </div>
                <div className="img-container">
                  <img
                    src={src}
                    alt={alt}
                  />
                </div>

              </OrderItemStyles>
            );
          })
        )
      }

    </OrderContainerStyles>
  );
};

export default OrderDetail;
