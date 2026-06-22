import "./App.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Movie } from "./types/Movie";
import Header from "./Header";
import Footer from "./Footer";

type SearchLocationState = {
  movies?: Movie[];
  searchTerm?: string;
};

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as SearchLocationState;
  const [searchTerm, setSearchTerm] = useState(state.searchTerm ?? "");
  const [movies, setMovies] = useState<Movie[]>(state.movies ?? []);

  useEffect(() => {
    navigate(".", { replace: true, state: { movies, searchTerm } });
  }, [movies, searchTerm, navigate]);

  const handleSearch = () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    if (searchTerm.trim() === "") {
      alert("Please enter a search term");
      return;
    }
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`,
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results.map(transformMovie)))
      .catch((error) => console.error("Error fetching data:", error));
  };

  function transformMovie(film: any): Movie {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    return {
      id: film.id,
      title: film.title || "Untitled",
      overview: film.overview || "No overview available",
      releaseDate: film.release_date || "Unknown",
      year: film.release_date
        ? new Date(film.release_date).getFullYear()
        : "Unknown",
      posterUrl: film.poster_path
        ? baseUrl + film.poster_path
        : "https://placehold.co/300x400?text=No%20Movie%20Image",
      rating: film.vote_average || 0,
    };
  }

  const handleSaveJson = () => {
    if (movies.length === 0) {
      alert("No movies to save. Please perform a search first.");
      return;
    }
    const json = JSON.stringify(movies, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "movies.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <main>
        <div className="navbar">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              placeholder="Rechercher un film..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              <button type="submit">Recherche</button>
              <button type="button" onClick={handleSaveJson}>
                Enregistrer au JSON
              </button>
            </div>
          </form>
        </div>
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
        <Footer />
      </main>
    </>
  );
}

export default Search;
