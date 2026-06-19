import { Link, useLocation, useParams } from 'react-router-dom'
import type { Movie } from './types/Movie'
import Header from './Header'
import Footer from './Footer'

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

  return (
    <>
    <Header />
    <main style={{ padding: '1rem' }}>
        
        <h1>Movie Details</h1>
      <Link to="/" state={{ movies: state.movies, searchTerm: state.searchTerm }}>Back to search</Link>
      {movie ? (
        <section style={{ marginTop: '1rem' }}>
          <h1>{movie.title}</h1>
          <p>
            <strong>Year:</strong> {movie.year}
          </p>
          <p>
            <strong>Rating:</strong> {movie.rating}
          </p>
          <img src={movie.posterUrl} alt={movie.title} style={{ maxWidth: '300px' }} />
          <p>{movie.overview}</p>
        </section>
      ) : (
        <section style={{ marginTop: '1rem' }}>
          <h1>Movie details</h1>
          <p>No movie data in navigation state.</p>
          <p>Movie id: {id}</p>
        </section>
      )}

    </main>
    <Footer />
    </>
  )
}

export default MovieDetails
