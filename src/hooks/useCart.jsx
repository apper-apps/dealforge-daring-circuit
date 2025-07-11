import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Error from "@/components/ui/Error";

// Create the cart context
const CartContext = createContext({})
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dealforge-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dealforge-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (dealId, quantity = 1, tier = 'single') => {
    setItems(prev => {
      const existingItem = prev.find(item => item.dealId === dealId && item.tier === tier)
      
      if (existingItem) {
        toast.success('Quantity updated in cart!')
        return prev.map(item =>
          item.dealId === dealId && item.tier === tier
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        toast.success('Added to cart!')
        return [...prev, { dealId, quantity, tier }]
      }
    })
  }

  const removeFromCart = (dealId, tier = null) => {
    setItems(prev => {
      const filtered = tier 
        ? prev.filter(item => !(item.dealId === dealId && item.tier === tier))
        : prev.filter(item => item.dealId !== dealId)
      
      toast.info('Removed from cart')
      return filtered
    })
  }

  const updateQuantity = (dealId, quantity, tier = 'single') => {
    if (quantity <= 0) {
      removeFromCart(dealId, tier)
      return
    }

    setItems(prev =>
      prev.map(item =>
        item.dealId === dealId && item.tier === tier
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    toast.info('Cart cleared')
  }

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Wrap the entire app with CartProvider in main.jsx or App.jsx
// This is handled in the App.jsx component