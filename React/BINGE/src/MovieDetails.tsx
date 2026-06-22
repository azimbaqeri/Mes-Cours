import { useParams } from "react-router-dom";
import type { MovieDetail } from "./types/MovieDetail";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FaStar, FaImdb } from "react-icons/fa";

function MovieDetails() {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = React.useState<MovieDetail | null>(
    null,
  );
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  React.useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
          );
          const data = await response.json();
          setMovieDetails(await transformMovie(data));
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      };
      fetchMovieDetails();
    }
  }, [id]);

  const formatRuntime = (runtime?: number | null) => {
    if (runtime == null || Number.isNaN(runtime)) return "Unknown";
    const totalMinutes = Math.round(runtime * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}min`;
  };
  const fetchTrailer = async (movieId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
      );
      const data = await response.json();
      const trailer = data.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube",
      );
      return trailer ? trailer.key : null;
    } catch (error) {
      console.error("Error fetching trailer:", error);
      return null;
    }
  };
  async function transformMovie(film: any): Promise<MovieDetail> {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const trailerUrl = await fetchTrailer(film.id);
    return {
      id: film.id,
      imdb_id: film.imdb_id || null,
      title: film.title || "Untitled",
      genres: film.genres ? film.genres.map((genre: any) => genre.name) : [],
      origin_country: film.production_countries
        ? film.production_countries.map((country: any) => country.iso_3166_1)
        : [],
      original_language: film.original_language || "Unknown",
      overview: film.overview || "No overview available",
      production_companies_logo: film.production_companies
        ? film.production_companies.map(
            (company: any) => baseUrl + company.logo_path,
          )
        : [],
      production_companies: film.production_companies
        ? film.production_companies.map((company: any) => company.name)
        : [],
      releaseDate: film.release_date || "Unknown",
      runtime: film.runtime / 60 || null,
      year: film.release_date
        ? new Date(film.release_date).getFullYear()
        : "Unknown",
      posterUrl: film.poster_path
        ? baseUrl + film.poster_path
        : "https://placehold.co/300x400?text=No%20Movie\n%20Image",
      backgroundImageUrl: film.backdrop_path
        ? `https://image.tmdb.org/t/p/w1920${film.backdrop_path}`
        : null,
      rating: film.vote_average || 0,
      trailerUrl: trailerUrl,
    };
  }

  console.log("Fetched movie details:", movieDetails); // Log the fetched movie details
  return (
    <>
      <Header />

      <div className="container">
        <div
          className="movie-details-container"
          style={{
            backgroundImage: `url(${movieDetails?.backgroundImageUrl})`,
          }}
        >
          <div className="movie-header">
            <div className="title">
              <h1>{movieDetails?.title}</h1>
              <p>
                {movieDetails?.year} - {formatRuntime(movieDetails?.runtime)} -
                Langue d'origine:{" "}
                {movieDetails?.original_language.toUpperCase()} (
                {movieDetails?.origin_country.join(", ")})
              </p>
            </div>
            <div className="rating">
              <p>
                Rating:{" "}
                {movieDetails?.rating
                  ? `${movieDetails?.rating.toFixed(1)}`
                  : ""}{" "}
                <FaStar color="gold" />
              </p>
              {movieDetails?.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaImdb className="imdb" />
                </a>
              )}
            </div>
          </div>
          <div className="movie-details">
            <div className="movie-poster">
              <img src={movieDetails?.posterUrl} alt={movieDetails?.title} />
            </div>
            <div className="movie-trailer">
              <iframe
                className="ytplayer"
                src={
                  movieDetails?.trailerUrl
                    ? `https://www.youtube.com/embed/${movieDetails.trailerUrl}?autoplay=1&cc_load_policy=1&controls=0&disablekb=0&fs=0&modestbranding=1&playsinline=0&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1`
                    : undefined
                }
                frameBorder="0"
              ></iframe>
            </div>
            {/* "https://www.youtube.com/watch?v=t06RUxPbp_c" */}
          </div>
          <div className="moveie-text">
            <div className="genre">
              {movieDetails?.genres.map((genre, index) => (
                <span key={index} className="genre_badge">
                  {genre}
                </span>
              ))}
            </div>
            <div className="movie-info">
              <p>{movieDetails?.overview}</p>
              <div className="production-companies">
                {movieDetails?.production_companies_logo.map((logo, index) => (
                  <img
                    key={index}
                    src={logo}
                    alt={movieDetails?.production_companies[index]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MovieDetails;
