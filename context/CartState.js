import { useContext, useState, createContext } from 'react';

const defaultCtx = () => console.log('CartState: defaultCtx');

const LocalStateContext = createContext({
  cart: [],
  addToCart: () => defaultCtx('add'),
  openCart: () => defaultCtx('open cart'),
  removeFromCart: () => defaultCtx('remove'),
  clearCart: () => defaultCtx('clear'),
});
const LocalStateProvider = LocalStateContext.Provider;

const CartStateProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setCartVisibility] = useState(false);

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
