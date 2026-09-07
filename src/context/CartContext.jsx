import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('flowerShopCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('flowerShopCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.documentId === product.documentId && item.type !== 'gift-basket'
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.documentId === product.documentId && item.type !== 'gift-basket'
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevItems,
        {
          documentId: product.documentId,
          name: product.name,
          price: product.price,
          quantity,
          type: 'product',
          image: product.Image?.url || product.localImage || null,
        },
      ];
    });
  };

  const addBasketToCart = (basket) => {
    setCartItems((prevItems) => [
      ...prevItems,
      {
        documentId: basket.documentId || `basket-${Date.now()}`,
        name: basket.name,
        price: basket.basePrice,
        quantity: 1,
        type: 'gift-basket',
        theme: basket.theme,
        items: basket.items,
        cardMessage: basket.cardMessage,
        wrapping: basket.wrapping,
      },
    ]);
  };

  const removeFromCart = (documentId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.documentId !== documentId)
    );
  };

  const updateQuantity = (documentId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(documentId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.documentId === documentId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addBasketToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
