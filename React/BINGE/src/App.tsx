import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

type TVShow = {
  id: number;
  name: string;
  overview: string;
  firstAirDate: string;
  year: number | string;
  posterUrl: string;
  rating: number;
};

function App() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setShows(data.results.map(transformShow));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching TV shows:", err);
        setLoading(false);
      });
  }, []);

  function transformShow(show: any): TVShow {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    return {
      id: show.id,
      name: show.name || "Untitled",
      overview: show.overview || "No overview available",
      firstAirDate: show.first_air_date || "Unknown",
      year: show.first_air_date
        ? new Date(show.first_air_date).getFullYear()
        : "Unknown",
      posterUrl: show.poster_path
        ? baseUrl + show.poster_path
        : "https://placehold.co/300x400?text=No%20Image",
      rating: show.vote_average || 0,
    };
  }

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h2 className="section-title">Séries populaires</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : shows.length > 0 ? (
            <div className="movie-list">
              {shows.map((show) => (
                <div key={show.id} className="movie-card">
                  <img src={show.posterUrl} alt={show.name} />
                  <div className="card-details">
                    <h4>{show.name}</h4>
                    <p>{show.year}</p>
                    <p>
                      <strong>Rating:</strong> {show.rating.toFixed(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucune série trouvée.</p>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
