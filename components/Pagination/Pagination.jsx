import React from 'react';
import Head from 'next/head';
import PaginationStyles from '../styles/PaginationStyles';
import { useQuery } from '@apollo/client';
import { Q_PAGINATION } from '../../gql/queries';
import DisplayError from '../ErrorMessage';
import Link from 'next/link';
import { perPage } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ page }) => {
  console.log(page);
  const { error, loading, data } = useQuery(Q_PAGINATION);

  if (!!loading) {
    return (
      <p>Loading...</p>
    );
  }
  if (!!error) {
    return (
      <DisplayError error={error}/>
    );
  }

  const { _allProductsMeta: meta } = data;
  const { count } = meta;
  const pages = (Math.ceil(count / perPage));

  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits</title>
      </Head>
      <Link href={`/products/${page}`}>
        <FontAwesomeIcon
          size="xs"
          icon={faArrowLeft}
        />
      </Link>
      <p>Page _ of {pages}</p>
      <Link href={'/'}>Next</Link>
    </PaginationStyles>
  );
};

export default Pagination;
