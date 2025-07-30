const API_KEY = "4287ad07";

//no pasamos el estado lo q hacemos es retornar
export const searchMovies = async ({ query }) => {
  if (query === "") return;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    const json = await response.json();

    const movies = json.Search;

    /*"Si movies existe (o sea, no es null ni undefined), entonces hace el .map(...)*/
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (e) {
    throw new Error("error en la busqueda de la pelicula");
  } finally {
  }
};
