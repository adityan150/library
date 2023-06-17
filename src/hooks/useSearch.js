import { useEffect, useState } from "react";
import axios from "axios";

const useSearch = (query, filter, sort, page) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    let url =
      query && query.length > 0
        ? "https://openlibrary.org/search.json"
        : "https://openlibrary.org/trending/daily.json";

    const params = {
      q: query,
      page: page,
      limit: 12,
      sort: sort,
    };

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, { params });
        const bookData = response.data.docs || response.data.works;
        setData((prevData) => [...new Set([...prevData, ...bookData])]);
        setIsLoading(false);
        if (data.length >= response.data.numFound) {
          setHasMore(false);
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, filter, sort, page]);

  return { data, isLoading, setIsLoading, error };
};

export default useSearch;
