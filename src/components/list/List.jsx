import "./list.css";
import PropTypes from "prop-types";
import Card from "../card/Card";
import useSearch from "../../hooks/useSearch";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { SearchContext } from "../../context/SearchContext";

function List({ addItem }) {
  const { searchState, dispatch } = useContext(SearchContext);
  const { query, filter, sort, page } = searchState;
  const { data, isLoading, setIsLoading, error, hasMore } = useSearch(
    query,
    filter,
    sort,
    page
  );

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting)
          dispatch({ type: "SET_PAGE", payload: page + 1 });
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const [books, setBooks] = useState([]);

  useEffect(() => {
    setIsLoading(true);
  }, [searchState, setIsLoading]);

  useEffect(() => {
    if (!isLoading) {
      if (query && query.length > 0) {
        setBooks(data);
      } else {
        setBooks(data);
      }
    }
  }, [query, isLoading, data]);

  return (
    <>
      <h1 className="list-title">
        {error
          ? "Something went wrong"
          : query && query.length > 0
          ? `Search results for "${query}"`
          : "Trending Books"}
      </h1>
      <div className="list">
        {books &&
          books.map((book, index) => {
            if (books.length === index + 1) {
              return (
                <Card
                  key={index}
                  book={book}
                  addItem={addItem}
                  ref={lastBookElementRef}
                />
              );
            } else {
              return <Card key={index} book={book} addItem={addItem} />;
            }
          })}
        {isLoading &&
          Array(12)
            .fill()
            .map((_, index) => {
              return <Card key={index} book={null} />;
            })}
      </div>
    </>
  );
}

List.propTypes = {
  addItem: PropTypes.func,
};

export default List;
