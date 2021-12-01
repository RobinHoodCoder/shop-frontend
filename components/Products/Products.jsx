import React from 'react';
import gql from 'graphql-tag';

const Q_ALL_PRODUCTS = gql`query ALL_PRODUCTS {
    allProducts {
        id
        name
        description
    }
}
`;

const Products = (props) => {
  const { dummy } = props;

  return (
    <div>

    </div>
  );
};

export default Products;
