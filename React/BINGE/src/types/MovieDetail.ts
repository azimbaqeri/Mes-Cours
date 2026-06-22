export type MovieDetail = {
  id: number
  imdb_id: string | null
  title: string
  genres: string[]
  origin_country: string[]
  original_language: string
  production_companies_logo: string[]
  production_companies: string[]
  overview: string
  releaseDate: string
  runtime: number | null
  year: number | string
  posterUrl: string
  backgroundImageUrl?: string | null
  rating: number
  trailerUrl?: string | null
}