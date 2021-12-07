import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import ProductItem from '../ProductItem/ProductItem';
import { Q_ALL_PRODUCTS } from '../../gql/queries';


const Products = (props) => {
  const { data, loading, error } = useQuery(Q_ALL_PRODUCTS);


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


  return (
    <ProductLists>
      {
        data && (
          data.allProducts?.length && (
            data.allProducts.map((item, i) => {
              const { name, id, description, photo, price } = item;
              console.log({ allProductsItem: photo });
              if (!!photo) {
                return (
                  <ProductItem
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
        )
      }
    </ProductLists>
  );
};

export default Products;
