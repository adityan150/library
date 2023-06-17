import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import { searchReducer, INITIAL_STATE } from "../reducers/SearchReducer";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchState, dispatch] = useReducer(searchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider value={{ searchState, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
