import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Q_PAGINATION } from '../gql/queries';
import { perPage as itemsPerPage } from '../config';
import DisplayError from '../components/ErrorMessage';

export const PaginationContext = React.createContext({
  pages: 0,
});

const PaginationProvider = ({ children, page }) => {
  console.log({ prodivder: 'PRovider' });
  const { error, loading, data } = useQuery(Q_PAGINATION);
  const [perPage, setPerPage] = useState(itemsPerPage);

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
