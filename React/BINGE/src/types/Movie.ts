export type Movie ={
  id: number
  title: string
  overview: string
  releaseDate: string
  year: number | string
  posterUrl: string
  rating: number
}
export type MovieDetails = {
  id: number
  imdb_id: string | null
  title: string
  genres: string[]
  origin_country: string[]
  production_companies_logo: string[]
  overview: string
  releaseDate: string
  runtime: number | null
  year: number | string
  posterUrl: string
  rating: number
}