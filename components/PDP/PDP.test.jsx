import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { fakeItem } from '../../lib/testUtils';
import { Q_SINGLE_PRODUCT } from '../../gql/queries';
import PDP from './PDP';
import { GraphQLError } from 'graphql';

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

describe('<PDP/>', () => {
  it('renders with proper data', async () => {
    // We need to make some fake data
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <PDP id="123" />
      </MockedProvider>
    );
    // Wait for the test ID to show up
    await screen.findByTestId('price');
    expect(container)
      .toMatchSnapshot();
  });

  it('Errors out when an item is no found', async () => {
    const errorMock = [
      {
        request: {
          query: Q_SINGLE_PRODUCT,
          variables: {
            id: '123',
          },
        },
        result: {
          errors: [new GraphQLError('Error!')],
        },
        // error: new Error('Error!'),
      },
    ];
    const { container, debug } = render(
      <MockedProvider mocks={errorMock}>
        <PDP id="123" />
      </MockedProvider>
    );
    await screen.findByTestId('graphql-error');
    expect(container)
      .toHaveTextContent('Shoot!');
    expect(container)
      .toHaveTextContent('Item not found!!!');
  });
});
