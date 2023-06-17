import "./card.css";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { forwardRef, useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/display-name
const Card = forwardRef((props, ref) => {
  const { book, addItem } = props;
  const {
    title,
    author_name: author,
    first_publish_year: yop,
    cover_i: cover,
  } = book || {};

  const [rating, setRating] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org${book?.key}/ratings.json`
        );
        setRating(response.data?.summary?.average?.toFixed(1));
      } catch (error) {
        console.log(error);
      }
    };

    if (book && book.key) fetchData();
  });

  return (
    <div className="card" ref={ref}>
      <div className="card__image">
        {cover ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
            alt={title + " cover"}
          />
        ) : (
          <Skeleton height={350} width={250} />
        )}
      </div>
      <div className="card__info">
        <h1 className="card__title">{title || <Skeleton width={200} />}</h1>
        <div className="card__author">
          {author ? `Author: ${author}` : <Skeleton width={150} />}
        </div>
        <div className="card__published">
          {yop ? `First published: ${yop}` : <Skeleton width={200} />}
        </div>
        <div className="card__rating">
          {rating !== -1 ? (
            rating ? (
              `Rating: ${rating}/5`
            ) : (
              ""
            )
          ) : (
            <Skeleton width={100} />
          )}
        </div>
      </div>
      {book && addItem && (
        <button className="card__button" onClick={() => addItem(book)}>
          Add to cart
        </button>
      )}
    </div>
  );
});

Card.propTypes = {
  book: PropTypes.object,
  addItem: PropTypes.func,
};

export default Card;
