import "./App.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Movie } from "./types/Movie";

type SearchLocationState = {
  movies?: Movie[];
  searchTerm?: string;
};

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as SearchLocationState;
  const [movies, setMovies] = useState<Movie[]>(state.movies ?? []);
  const [searchTerm, setSearchTerm] = useState(state.searchTerm ?? "");

  useEffect(() => {
    const newState = (location.state ?? {}) as SearchLocationState;
    if (newState.movies) {
      setMovies(newState.movies);
    }
    if (newState.searchTerm) {
      setSearchTerm(newState.searchTerm);
    }
  }, [location.state]);

  return (
    <main>
      <div className="container">
        {movies.length > 0 ? (
          <div className="movie-list">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() =>
                  navigate(`/MovieDetails/${movie.id}`, {
                    state: { movie, movies, searchTerm },
                  })
                }
              >
                <img src={movie.posterUrl} alt={movie.title} />
                <div className="card-details">
                  <h4>{movie.title}</h4>
                  <p>{movie.year}</p>
                  <p>
                    <strong>Rating:</strong> {movie.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>
            Aucun film trouvé. Veuillez essayer un autre terme de recherche.
          </p>
        )}
      </div>
    </main>
  );
}

export default Search;
