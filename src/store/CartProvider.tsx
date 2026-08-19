"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type AddToCartItem = Omit<CartItem, "quantity">;

type CartContextType = {
  cartItems: CartItem[];
  buyNowItem: CartItem | null;

  addToCart: (
    item: AddToCartItem,
    quantity?: number
  ) => void;

  removeFromCart: (id: string) => void;

  updateQuantity: (
    id: string,
    quantity: number
  ) => void;

  setBuyNowItem: (item: CartItem) => void;
  clearBuyNowItem: () => void;

  cartCount: number;
};

const CartContext =
  createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = "vruksha-cart";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    []
  );

  const [buyNowItem, setBuyNowItemState] =
    useState<CartItem | null>(null);

  const [cartLoaded, setCartLoaded] = useState(false);

  // =========================================
  // LOAD CART FROM LOCAL STORAGE
  // =========================================

  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );
    } finally {
      setCartLoaded(true);
    }
  }, []);

  // =========================================
  // SAVE CART TO LOCAL STORAGE
  // =========================================

  useEffect(() => {
    if (!cartLoaded) {
      return;
    }

    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cartItems, cartLoaded]);

  // =========================================
  // ADD TO CART
  // =========================================

  const addToCart = (
    item: AddToCartItem,
    quantity = 1
  ) => {
    if (quantity <= 0) {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + quantity,
              }
            : cartItem
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity,
        },
      ];
    });
  };

  // =========================================
  // REMOVE FROM CART
  // =========================================

  const removeFromCart = (id: string) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  };

  // =========================================
  // SET EXACT CART QUANTITY
  // =========================================

  const updateQuantity = (
    id: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  // =========================================
  // BUY NOW
  // DOES NOT TOUCH NORMAL CART
  // =========================================

  const setBuyNowItem = (item: CartItem) => {
    setBuyNowItemState(item);
  };

  const clearBuyNowItem = () => {
    setBuyNowItemState(null);
  };

  // =========================================
  // NAVBAR CART COUNT
  // =========================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        buyNowItem,

        addToCart,
        removeFromCart,
        updateQuantity,

        setBuyNowItem,
        clearBuyNowItem,

        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}