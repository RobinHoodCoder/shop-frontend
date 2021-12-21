import styled from 'styled-components';
import React from 'react';

import PropTypes from 'prop-types';

const CheckoutErrorStyles = styled.div`
  padding: .6rem;
  background: white;
  margin: .6rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 3px solid red;
  font-size: .8rem;

  p {
    margin: 0;
    font-weight: 100;
  }

  strong {
    margin-right: 1rem;
  }
`;

const CheckoutError = ({ error }) => {
  if (!error || !error.message) {
    return null;
  }
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <CheckoutErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </CheckoutErrorStyles>
    ));
  }
  return (
    <CheckoutErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </CheckoutErrorStyles>
  );
};

CheckoutError.defaultProps = {
  error: {},
};

CheckoutError.propTypes = {
  error: PropTypes.object,
};

export default CheckoutError;
