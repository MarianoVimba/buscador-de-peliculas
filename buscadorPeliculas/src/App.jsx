import { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";

function useSearch() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true); //saber si es la primera vez q busca

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = false;
      return;
    }

    if (query === "") {
      setError("no se puede buscar una pelicula vacia");
      return;
    }

    if (query.length < 3) {
      setError("la busqueda tiene que tener mas de 3 caracteres");
      return;
    }
    setError(null);
  }, [query]);

  return { query, setQuery, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { query, setQuery, error } = useSearch();
  const {
    movies: mapppedMovies,
    getMovies,
    loading,
  } = useMovies({ query, sort });

  const debounceGetMovies = useCallback(
    //no haga llamadas constantemente q le de un tiempo a escribir
    debounce((query) => {
      getMovies({ query });
    }, 400),
    [getMovies]
  );

  const handleSubmit = (event) => {
    // este formato sirve para si tenes muchos inputs q con useRef seria mas largo
    /*     event.preventDefault();
    const fields = Object.fromEntries(new window.FormData(event.target))
 */

    /*     //forma no controlada
    event.preventDefault();
    const input = new window.FormData(event.target);
    const query = input.get("query");
    //aca se puede hacer las validaciones con la query si esta vacio etc
     */

    event.preventDefault();
    getMovies({ query });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  //estado controlado cada vez q escribe
  const handleChange = (event) => {
    const newSearch = event.target.value;
    setQuery(newSearch);

    debounceGetMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={query}
            name="query"
            placeholder="Batman, SpiderMan, SuperMan ..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        {loading ? (
          <p>...cargando </p>
        ) : (
          <Movies movies={mapppedMovies}></Movies>
        )}
      </main>
    </div>
  );
}
/*
<Movies movies={movies} />
Porque:
El primer movies (a la izquierda del =) es el nombre de la prop que espera el componente Movies.
El segundo movies (a la derecha del =) es la variable local dentro de App.js, que contiene los datos de las películas.
*/
export default App;
