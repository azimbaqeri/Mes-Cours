import logo from "./assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "./types/Movie";
import { SiThemoviedatabase } from "react-icons/si";


function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

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
      .then((data) => {
        const transformedMovies = data.results.map(transformMovie);
        setMovies(transformedMovies);
        navigate("/search", {
          state: { movies: transformedMovies, searchTerm },
          replace: true,
        });
      })
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

  return (
    <>
    <header>
      <a href="/">
        <img src={logo} alt="IMDB Logo" width="100" />
      </a>
      
    </header>
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
            <button type="submit"><SiThemoviedatabase size={30} /> Recherche </button>
          </div>
        </form>
      </div>
      </>
  );
}

export default Header;
