import CartItem from "../cart-item/CartItem";
import "./cart.css";

import PropTypes from "prop-types";

function Cart({ cart, closeCart, removeItem }) {
  return (
    <div className="cart">
      <div className="cart__container">
        <h1 className="cart__container__title">
          Cart
          <button className="cart__container__close" onClick={closeCart}>
            ❌
          </button>
        </h1>

        <div className="cart__container__list">
          {cart?.length > 0 ? (
            cart.map((book, index) => {
              return (
                <CartItem key={index} book={book} removeItem={removeItem} />
              );
            })
          ) : (
            <h1 className="cart__container__list__empty">Cart is empty</h1>
          )}
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array,
  closeCart: PropTypes.func,
  removeItem: PropTypes.func,
};

export default Cart;
