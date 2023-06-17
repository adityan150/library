import { useState, useEffect } from "react";

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const userCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!userCart) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  const addItem = (item) => {
    const userCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!userCart) {
      const newCart = [item];
      setCart(newCart);
    } else {
      const updatedCart = [...userCart, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
    alert("Book added to cart");
  };

  const removeItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.key !== item.key);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return { cart, addItem, removeItem, isCartOpen, setIsCartOpen };
}
