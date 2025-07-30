import { searchMovies } from "../service/movies";
import { useCallback, useMemo, useRef, useState } from "react";

export function useMovies({ query, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(query);

  const getMovies = useCallback(async ({ query }) => {
    //xq sino en [] va query y cada vez q vas escribiendo se renderiza
    // use memo puede devolver una fn
    if (previusSearch.current === query) return;
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = query;
      const newMovies = await searchMovies({ query });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovie = useMemo(() => {
    return sort //devuelve el valor que querés memorizar
      ? //useMemo espera que le pases una función que devuelva un valor
        [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovie, getMovies, loading };
}
