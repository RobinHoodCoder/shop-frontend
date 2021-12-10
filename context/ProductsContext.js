import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Q_ALL_PRODUCTS, Q_PAGINATION } from '../gql/queries';
import { perPage as itemsPerPage } from '../config';

export const ProductsContext = React.createContext({
  products: [],
});

const ProductsProvider = ({ children, page }) => {
  const [perPage, setPerPage] = useState(itemsPerPage);

  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useQuery(Q_ALL_PRODUCTS, {
    variables: {
      first: perPage,
      skip: page,
    },
  });

  return (
    <ProductsContext.Provider
      value={{
        setPerPage,
        products: productData?.allProducts,
        productLoading,
        productError,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export default ProductsProvider;
