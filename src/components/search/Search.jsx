import { useContext, useState } from "react";
import "./search.css";
import PropTypes from "prop-types";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";

function Search() {
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const { searchState, dispatch } = useContext(SearchContext);
  const { filter, sort } = searchState;
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    clearTimeout(debounceTimeout);
    setDebounceTimeout(
      setTimeout(() => {
        getSuggestions();
      }, 600)
    );
  };

  const getSuggestions = async () => {
    const response = await axios.get(`https://openlibrary.org/search.json`, {
      params: {
        q: searchValue,
        limit: 5,
      },
    });
    setSuggestions(response.data.docs);
    setShowSuggestions(true);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      if (searchValue.length > 0)
        dispatch({ type: "SET_QUERY", payload: searchValue });
    }
  };

  return (
    <>
      <div className="search-container">
        <img
          src="./search-icon.svg"
          alt="search-icon"
          className="search-container__searchIcon"
        />
        <input
          className="search-container__searchBar"
          type="search"
          placeholder="Search by book title, authors and publish year..."
          value={searchValue}
          onChange={handleInputChange}
          onBlur={() => setShowSuggestions(false)}
          onKeyUp={handleSearch}
        />
        <div className="search-suggestions">
          {showSuggestions &&
            suggestions.map((suggestion, index) => {
              return (
                <div className="search-suggestions__suggestion" key={index}>
                  <img
                    src={`https://covers.openlibrary.org/b/id/${suggestion.cover_i}-S.jpg`}
                    alt="book-cover"
                    className="search-suggestions__suggestion__cover"
                  />
                  <div className="search-suggestions__suggestion__info">
                    <h3 className="search-suggestions__suggestion__info__title">
                      {suggestion.title}
                    </h3>
                    <p className="search-suggestions__suggestion__info__author">
                      {suggestion.author_name}
                    </p>
                    <p className="search-suggestions__suggestion__info__year">
                      {suggestion.first_publish_year}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="search-options">
        <label className="search-options__label">Filter by:</label>
        <select
          className="search-options__filter"
          value={filter}
          onChange={(event) =>
            dispatch({ type: "SET_FILTER", payload: event.target.value })
          }
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="year">Year</option>
        </select>
        <label className="search-options__label">Sort by:</label>
        <select
          className="search-options__sort"
          value={sort}
          onChange={(event) =>
            dispatch({ type: "SET_SORT", payload: event.target.value })
          }
        >
          <option value="">Relevance</option>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
      </div>
    </>
  );
}

Search.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
};

export default Search;
