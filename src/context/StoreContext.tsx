import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, WishlistItem, Product, User } from '@/types';
import { toast } from 'sonner';

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;

  // UI
  isCouponPopupShown: boolean;
  setCouponPopupShown: (shown: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isCouponPopupShown, setCouponPopupShown] = useState(() => {
    return sessionStorage.getItem('couponPopupShown') === 'true';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Persist cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Persist coupon popup state
  useEffect(() => {
    sessionStorage.setItem('couponPopupShown', String(isCouponPopupShown));
  }, [isCouponPopupShown]);

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prev => {
      const existing = prev.find(
        item => 
          item.product.id === product.id && 
          item.selectedColor === color && 
          item.selectedSize === size
      );

      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && 
          item.selectedColor === color && 
          item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });

    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    toast.success('Item removed from cart');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addToWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return;
    }

    setWishlist(prev => [
      ...prev,
      { product, addedAt: new Date().toISOString() }
    ]);
    toast.success(`${product.name} added to wishlist!`);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.product.id !== productId));
    toast.success('Item removed from wishlist');
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.product.id === productId);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      setUser({
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        addresses: [],
        createdAt: new Date().toISOString()
      });
      toast.success('Welcome back!');
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const register = async (data: Partial<User> & { password: string }): Promise<boolean> => {
    // Mock register - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (data.email && data.password) {
      setUser({
        id: '1',
        email: data.email,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone,
        addresses: [],
        createdAt: new Date().toISOString()
      });
      toast.success('Account created successfully!');
      return true;
    }
    
    toast.error('Registration failed');
    return false;
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isCouponPopupShown,
        setCouponPopupShown,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
