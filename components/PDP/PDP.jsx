import React from 'react';
import { useQuery } from '@apollo/client';
import { Q_SINGLE_PRODUCT } from '../../gql/queries';
import DisplayError from '../ErrorMessage';
import  Head from 'next/head';
import styled from 'styled-components';
import Price from '../Price/Price';
import TitleBlock from '../TitleBlock/TitleBlock';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faEdit } from '@fortawesome/free-solid-svg-icons';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';

const ProductStyles = styled.main`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 200px;
  align-items: center;
  gap: 2rem;

  .content {
    padding: 0 1.5rem;
  }

  img {
    display: block;
    position: relative;
    width: 100%;
    object-fit: contain;
    max-height: 50vh;
  }
`;

const PDP = ({ id }) => {
  const { data = {}, loading, error } = useQuery(Q_SINGLE_PRODUCT, { variables: { id } });
  const { Product = {} }  = data;

  const { name, description, price, photo } = Product;


  return (
    <>
      <Head>
        <title>Sick fits | {name}</title>
      </Head>
      {!error ? (
        !loading && (
          <ProductStyles>
            <div className="img-container">
              <img src={photo?.image?.publicUrlTransformed} alt={photo.altText} />
            </div>
            <div className={'content'}>
              <TitleBlock
                name={name}
                description={description}
                price={price}
                centered
              />
              <Price amount={price}/>
              <Link href={{
                pathname: '/edit',
                query: {
                  id,
                },
              }}>
                <FontAwesomeIcon
                  size="2x"
                  icon={faEdit}
                />
              </Link>
              <AddToCartButton id={id}/>
            </div>
          </ProductStyles>
        )
      ) : (
        <DisplayError error={error}/>
      )}
    </>
  );
};

export default PDP;
