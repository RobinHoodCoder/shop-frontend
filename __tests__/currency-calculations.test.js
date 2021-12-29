import formatMoney  from '../lib/formatMoney';
import { formattedTotalPrice } from '../lib/calcTotalPrice';

const cartMock = [
  {
    quantity: 1,
    product: {
      price: '10',
    },
  },
  {
    quantity: '2',
    product: {
      price: '10',
    },
  },
];

describe('Tests formattedTotalPrice function', () => {
  it('should add the price ', () => {
    expect(formattedTotalPrice(cartMock)).toEqual('€0.30');
  });
});

describe('Tests formattedMoney function', () => {
  it('should add the price ', () => {
    expect(formatMoney(10)).toEqual('€0.10');
  });
});
