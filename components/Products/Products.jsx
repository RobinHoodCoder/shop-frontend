import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Ankeiler from '../Ankeiler/Ankeiler';
import { Q_ALL_PRODUCTS } from '../../gql/queries';


const Products = ({ page, perPage }) => {
  const { data, loading, error } = useQuery(Q_ALL_PRODUCTS, {
    variables: {
      first: perPage,
      skip: page,
    },
  });

  useEffect(() => {
    return () => {
    };
  }, []);

  console.log({ data, loading, error });

  const ProductLists = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
  `;

  if (!!loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProductLists>
      {
        !!data?.allProducts ? (
          data.allProducts?.length && (
            data.allProducts.map((item, i) => {
              const { name, id, description, photo, price } = item;
              if (!!photo) {
                return (
                  <Ankeiler
                    id={id}
                    price={price}
                    name={name}
                    description={description}
                    photo={photo}
                    key={id}
                  />
                );
              }
            })
          )
        ) : (
          <p>No products found</p>
        )
      }
    </ProductLists>
  );
};

export default Products;
