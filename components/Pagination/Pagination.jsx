import React from 'react';
import Head from 'next/head';
import PaginationStyles from '../styles/PaginationStyles';
import { useQuery } from '@apollo/client';
import { Q_PAGINATION } from '../../gql/queries';
import DisplayError from '../ErrorMessage';
import Link from 'next/link';


const Pagination = ({ page: pageString, perPage }) => {
  const page = Number(pageString);

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
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>Prev</a>
      </Link>

      <p>Page {page} of {pages}</p>

      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pages}>Next</a>
      </Link>

    </PaginationStyles>
  );
};

export default Pagination;
