import React, { useContext } from 'react';
import Head from 'next/head';
import PaginationStyles from '../styles/PaginationStyles';
import DisplayError from '../ErrorMessage';
import Link from 'next/link';
import { PaginationContext } from '../../context/PaginationProvider';


const Pagination = () => {
  const paginationCtx = useContext(PaginationContext);
  const { page, pages, loading, error } = paginationCtx;

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

  return (
    <PaginationStyles>
      <Head>
        <title>Sick Products {page > 1 ? (`| Page ${page}`) : ''}</title>
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
