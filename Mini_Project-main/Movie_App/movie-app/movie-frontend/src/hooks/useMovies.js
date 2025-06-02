import { useState, useEffect } from "react";
import api from "../api/axios";

export default function useMovies(initialQuery = "", initialPage = 1) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [lastPage, setLastPage] = useState(1);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .get("/movies", {
        params: {
          search: query,
          page,
        },
      })
      .then((res) => {
        setMovies(res.data.data);
        setLastPage(res.data.last_page);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load movies");
        setLoading(false);
      });
  }, [query, page]);

  return { movies, loading, error, page, setPage, lastPage, setQuery };
}
