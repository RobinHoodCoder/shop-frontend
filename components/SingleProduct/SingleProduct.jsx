import React from 'react';
import { useQuery } from '@apollo/client';
import { Q_SINGLE_PRODUCT } from '../../gql/queries';
import DisplayError from '../ErrorMessage';
import  Head from 'next/head';
import styled from 'styled-components';

const SingleProduct = ({ id }) => {
  const { data = {}, loading, error } = useQuery(Q_SINGLE_PRODUCT, { variables: { id } });
  const { Product = {} }  = data;

  const { name, description, price, photo } = Product;
  const ProductStyles = styled.main`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 200px;
    max-height: 400px;
    align-items: center;
    gap: 2rem;
    img {
      display: block;
      position: relative;
      width: 100%;
      object-fit: contain;
    }
  `;


  return (
    <>
      <Head>
        <title>Sick fits | {name}</title>
      </Head>
      {!error ? (
        !loading && (
          <ProductStyles>
            <img src={photo.image.publicUrlTransformed} alt={photo.altText} />
            <div className={'content'}>
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </ProductStyles>
        )
      ) : (
        <DisplayError error={error}/>
      )}
    </>
  );
};

export default SingleProduct;
