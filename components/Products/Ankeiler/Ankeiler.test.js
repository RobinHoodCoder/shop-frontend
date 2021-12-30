
import { render, screen } from '@testing-library/react';
import Ankeiler from './Ankeiler';
import { MockedProvider } from '@apollo/client/testing';
import { fakeItem } from '../../../lib/testUtils';
import { Q_SINGLE_PRODUCT } from '../../../gql/queries';

const product = fakeItem();

const mocks = [
  {
    // When someone requests this query and variable combo
    request: {
      query: Q_SINGLE_PRODUCT,
      variables: {
        id: '123',
      },
    },
    // Return this data
    result: {
      data: {
        Product: product,
      },
    },
  },
];

describe(`<Product/> price`, () => {
  it(`Renders the component`, () => {
    expect(true)
      .toBe(true);

    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <Ankeiler {...product}>Test</Ankeiler>
      </MockedProvider>,
    );
    expect(screen.getByTestId('price', { exact: false })).toBeInTheDocument();
    debug();
  });
});

describe(`<Product/> markup matches snapshot`, () => {
  it(`Renders the component, matches the snapshot`, () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <Ankeiler {...product}>Test</Ankeiler>
      </MockedProvider>,
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('price', { exact: false }))
      .toBeInTheDocument();
    debug();
  });
});
