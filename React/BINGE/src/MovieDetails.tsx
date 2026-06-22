import { Link, useLocation, useParams } from 'react-router-dom'
import type { Movie, MovieDetails } from './types/Movie'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { FaStar } from "react-icons/fa";

type LocationState = {
  movie?: Movie
  movies?: Movie[]
  searchTerm?: string
}

function MovieDetails() {
  const { id } = useParams()
  const location = useLocation()
  const state = (location.state ?? {}) as LocationState
  const movie = state.movie
  const [movieDetails, setMovieDetails] = React.useState<Movie | null>(null)
  const apiKey = import.meta.env.VITE_TMDB_API_KEY  
  React.useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
          const data = await response.json()
          setMovieDetails(transformMovie(data))
          
        } catch (error) {
          console.error('Error fetching movie details:', error)
        }
      }
      fetchMovieDetails()
    }
  }, [id])

  function transformMovie (film: any): MovieDetails {
    const baseUrl = 'https://image.tmdb.org/t/p/w500'
    return {
      id: film.id,
      imdb_id: film.imdb_id || null,
      title: film.title || 'Untitled',
      genres: film.genres ? film.genres.map((genre: any) => genre.name) : [],
      origin_country: film.production_countries ? film.production_countries.map((country: any) => country.iso_3166_1) : [],
      overview: film.overview || 'No overview available',
      production_companies_logo: film.production_companies ?  film.production_companies.map((company: any) =>baseUrl + company.logo_path) : [],
      releaseDate: film.release_date || 'Unknown',
      runtime: film.runtime/60 || null,
      year: film.release_date ? new Date(film.release_date).getFullYear() : 'Unknown',
      posterUrl: film.poster_path ? baseUrl + film.poster_path : 'https://placehold.co/300x400?text=No%20Movie\n%20Image',
      rating: film.vote_average || 0,

    }
  }





console.log('Fetched movie details:', movieDetails) // Log the fetched movie details
  return (
    <>
    <Header />
    
    <div className="container">
      <div className="movie-details-container">
        <div className="movie-header">
          <div className="title">
            <h1>{movieDetails?.title}</h1>
            <p>{movieDetails?.year}</p>
          </div>
          <div className="rating">
            <p>Rating: {movieDetails?.rating} <FaStar color="gold" /></p>
            
          </div>
        </div>
        <div className="movie-details">
            <div className="movie-poster">
                <img src={movieDetails?.posterUrl} alt={movieDetails?.title} />
            </div>
            <div className="movie-info">
              <p>{movieDetails?.overview}</p>
            </div>
        </div>
            <Link to="/" state={{ movies: state.movies, searchTerm: state.searchTerm }}>Back to search</Link>
        </div>
    </div>
     
    <Footer />
    </>
  )
}

export default MovieDetails
