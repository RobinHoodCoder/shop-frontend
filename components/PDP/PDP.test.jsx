import { getByTestId, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import PDP from './PDP';
import { Q_SINGLE_PRODUCT } from '../../gql/queries';
import { fakeItem } from '../../lib/testUtils';
import '@testing-library/jest-dom';
import Ankeiler from '../Products/Ankeiler/Ankeiler';

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

describe(`<PDP/> markup matches snapshot`, () => {
  it(`Renders the component, matches the snapshot`, async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <PDP {...product} />
      </MockedProvider>,
    );
    expect(container)
      .toMatchSnapshot();
    debug();
  });
  it('should have a price tag ', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <PDP id={product.id} />
      </MockedProvider>,
    );

    await screen.getByTestId('price', {});

    // expect(items).toBeInTheDocument();
  });
});
