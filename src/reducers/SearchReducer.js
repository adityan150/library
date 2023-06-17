const INITIAL_STATE = {
  query: "",
  filter: "",
  sort: "",
  page: 1,
};

export const ACTION_TYPES = {
  SET_QUERY: "SET_QUERY",
  SET_FILTER: "SET_FILTER",
  SET_SORT: "SET_SORT",
  SET_PAGE: "SET_PAGE",
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_QUERY:
      return { ...state, query: action.payload };
    case ACTION_TYPES.SET_FILTER:
      return { ...state, filter: action.payload };
    case ACTION_TYPES.SET_SORT:
      return { ...state, sort: action.payload };
    case ACTION_TYPES.SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export { searchReducer, INITIAL_STATE };
