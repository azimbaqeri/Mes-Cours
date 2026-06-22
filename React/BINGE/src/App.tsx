import "./App.css";
import { useEffect, useState } from "react";
import type { Movie } from "./types/Movie";
import {useLocation, useNavigate } from "react-router-dom";

type SearchLocationState = {
  movies?: Movie[];
  searchTerm?: string;
};

function App() {
  const [movies, setmovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as SearchLocationState;
  const [searchTerm, setSearchTerm] = useState(state.searchTerm ?? "");

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setmovies(data.results.map(transformMovie));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching TV movies:", err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setTopRatedMovies(data.results.map(transformMovie));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching TV movies:", err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setComingSoonMovies(data.results.map(transformMovie));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching TV movies:", err);
        setLoading(false);
      });
  }, []);

  function transformMovie(movie: any): Movie {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    return {
      id: movie.id,
      title: movie.title || "Untitled",
      overview: movie.overview || "No overview available",
      releaseDate: movie.release_date || "Unknown",
      year: movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : "Unknown",
      posterUrl: movie.poster_path
        ? baseUrl + movie.poster_path
        : "https://placehold.co/300x400?text=No%20Image",
      rating: movie.vote_average || 0,
    };
  }
  console.log("movies:", movies);
  return (
    <main>
      <div className="container popular-movies">
        <h2 className="section-title">Film populaires</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : movies.length > 0 ? (
          <div className="movie-list">
            {movies.slice(0, 4).map((movie) => (
              <div key={movie.id} className="movie-card" 
              onClick={() =>
                  navigate(`/MovieDetails/${movie.id}`, {
                    state: { movie, movies, searchTerm },
                  })
                }>
                <img src={movie.posterUrl} alt={movie.title} />
                <div className="card-details">
                  <h4>{movie.title}</h4>
                  <p>{movie.year}</p>
                  <p>
                    <strong>Rating:</strong> {movie.rating.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune série trouvée.</p>
        )}
      </div>

      <div className="container popular-movies">
        <h2 className="section-title">Top Rated Film</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : topRatedMovies.length > 0 ? (
          <div className="movie-list">
            {topRatedMovies.slice(0, 4).map((movie) => (
              <div key={movie.id} className="movie-card" 
              onClick={() =>
                  navigate(`/MovieDetails/${movie.id}`, {
                    state: { movie, movies, searchTerm },
                  })
                }>
                <img src={movie.posterUrl} alt={movie.title} />
                <div className="card-details">
                  <h4>{movie.title}</h4>
                  <p>{movie.year}</p>
                  <p>
                    <strong>Rating:</strong> {movie.rating.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune série trouvée.</p>
        )}
      </div>

<div className="container popular-movies">
        <h2 className="section-title">Up comming Film</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : comingSoonMovies.length > 0 ? (
          <div className="movie-list">
            {comingSoonMovies.slice(0, 4).map((movie) => (
              <div key={movie.id} className="movie-card" 
              onClick={() =>
                  navigate(`/MovieDetails/${movie.id}`, {
                    state: { movie, movies, searchTerm },
                  })
                }>
                <img src={movie.posterUrl} alt={movie.title} />
                <div className="card-details">
                  <h4>{movie.title}</h4>
                  <p>{movie.year}</p>
                  <p>
                    <strong>Rating:</strong> {movie.rating.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune série trouvée.</p>
        )}
      </div>

    </main>
  );
}

export default App;
