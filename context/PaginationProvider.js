import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Q_PAGINATION } from '../gql/queries';
import { perPage, perPage as itemsPerPage } from '../config';
import DisplayError from '../components/ErrorMessage';

export const PaginationContext = React.createContext({
  count: 0,
  pages: 0,
  page: 0,
  perPage,
  setPerPage: oke => console.log({ oke }, `set ${oke} per page`),
  error: null,
  loading: null,
});

const PaginationProvider = ({ children, page: pageString }) => {
  const { error, loading, data } = useQuery(Q_PAGINATION);
  const [perPage, setPerPage] = useState(itemsPerPage);

  const page = Number(pageString || 1);

  if (!!loading) {
    return (
      <p>Loading...</p>
    );
  }
  if (!!error) {
    return (
      <DisplayError error={error} />
    );
  }

  const { _allProductsMeta: meta } = data;
  const { count } = meta;
  const pages = (Math.ceil(count / perPage));

  return (
    <PaginationContext.Provider
      value={{
        count,
        page,
        pages,
        perPage,
        setPerPage,
        error,
        loading,
      }}
    >
      {children}

    </PaginationContext.Provider>
  );
};
export default PaginationProvider;
