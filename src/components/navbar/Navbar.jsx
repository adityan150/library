import "./navbar.css";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";

function Navbar({ setIsCartOpen }) {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) loginWithRedirect();
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <span className="navbar__container__logo">
          <img src="./icon.svg" alt="icon" className="icon" />
          <h1 className="title">E-Library</h1>
        </span>

        {isAuthenticated && (
          <span className="navbar__container__user-profile">
            <button className="logout-button" onClick={logout}>
              Log Out
            </button>
            <span className="user-info">
              <img
                src="./cart.svg"
                alt="cart icon"
                className="user-info__cart-icon"
                onClick={() => setIsCartOpen(true)}
              />
              <h1 className="user-info__username">
                {user.nickname ?? user.name}
              </h1>
              <img
                src={user.picture}
                alt="profile-picture"
                className="user-info__profile-img"
              />
            </span>
          </span>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  setIsCartOpen: PropTypes.func,
};

export default Navbar;
