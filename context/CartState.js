import React, { useContext } from 'react';

const defaultCtx = () => console.log('CartState: defaultCtx');

const LocalStateContext = React.createContext({
  cart: [],
  addToCart: () => defaultCtx('add'),
  removeFromCart: () => defaultCtx('remove'),
  clearCart: () => defaultCtx('clear'),
});
const LocalStateProvider = LocalStateContext.Provider;

const CartStateProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);
  const [showCart, setCartVisibility] = React.useState(true);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter(cartItem => cartItem.id !== item.id));
  };

  const toggleCart = () => {
    setCartVisibility(prevState => !prevState);
  };

  const closeCart = () => {
    setCartVisibility(prevState => !prevState);
  };

  const openCart = () => {
    setCartVisibility(true);
  };

  const cartActions = {
    removeFromCart,
    toggleCart,
    closeCart,
    openCart,
  };

  return (
    <LocalStateProvider
      value={{
        cart,
        showCart,
        addToCart,
        removeFromCart,
        ...cartActions,
      }}>
      {children}
    </LocalStateProvider>
  );
};

const useCart = () => {
  return useContext(LocalStateContext);
};


export { CartStateProvider, useCart };
