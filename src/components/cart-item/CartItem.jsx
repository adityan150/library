import "./cartItem.css";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";

function CartItem({ book, removeItem }) {
  const {
    title,
    author_name: author,
    first_publish_year: yop,
    cover_i: cover,
  } = book || {};

  return (
    <div className="cartItem">
      <div className="cartItem__image">
        {cover ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
            alt={title + " cover"}
          />
        ) : (
          <Skeleton height={250} width={180} />
        )}
      </div>
      <div className="cartItem__info">
        <h1 className="cartItem__title">{title || <Skeleton width={200} />}</h1>
        <div className="cartItem__author">
          {author ? `Author: ${author}` : <Skeleton width={150} />}
        </div>
        <div className="cartItem__published">
          {yop ? `First published: ${yop}` : <Skeleton width={200} />}
        </div>
      </div>
      <button className="cartItem__remove" onClick={() => removeItem(book)}>
        ❌
      </button>
    </div>
  );
}

CartItem.propTypes = {
  book: PropTypes.object,
  removeItem: PropTypes.func,
};

export default CartItem;
