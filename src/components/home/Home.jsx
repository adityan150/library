import { useEffect, useState } from "react";
import List from "../list/List";
import Search from "../search/Search";
import "./home.css";
import Navbar from "../navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import Cart from "../cart-modal/Cart";
import useCart from "../../hooks/useCart";

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userId, setUserId] = useState(null);
  const { cart, addItem, removeItem, isCartOpen, setIsCartOpen } =
    useCart(userId);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setUserId(user.user_id);
    }
  }, [isLoading, isAuthenticated, user]);

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (isCartOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isCartOpen]);

  return (
    <main className="home">
      <Navbar setIsCartOpen={setIsCartOpen} />
      <div className="home__container">
        <Search />
        <List addItem={addItem} />
      </div>

      {isCartOpen && (
        <Cart
          closeCart={() => setIsCartOpen(false)}
          cart={cart}
          removeItem={removeItem}
        />
      )}
    </main>
  );
}

export default Home;
