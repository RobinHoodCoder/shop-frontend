import formatMoney from './formatMoney';

const calcTotalPrice = (cart) => {
  return cart?.reduce((score, cartItem) => {
    // console.log(currentOutput, cartItem);
    const { product } = cartItem || {};
    if (!product) { // check if it's available because product can be deleted
      return score;
    }

    if (!product.price) {
      return score;
    }
    return score + (cartItem.quantity * product.price);
  }, 0);
};

export const formattedTotalPrice = (cart = []) => {
  return formatMoney(
    calcTotalPrice(cart)
  );
};

export default calcTotalPrice;
