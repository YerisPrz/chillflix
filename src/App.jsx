import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";

// Películas populares de respaldo en caso de no tener API Key
const MOCK_MOVIES = [
  {
    id: 1,
    title: "Obsession",
    poster_path: "/bOGkg67m58Ch2KjZgMMtYGBg867.jpg",
    vote_average: 8.5
  },
  {
    id: 2,
    title: "Interstellar",
    poster_path: "/gEU2Qv6v977vS6mjsfgspu7v86m.jpg",
    vote_average: 9.0
  },
  {
    id: 3,
    title: "Stranger Things",
    poster_path: "/49PhOCEs68SgW76YuuN97vYg895.jpg",
    vote_average: 8.8
  },
  {
    id: 4,
    title: "Wednesday",
    poster_path: "/9pf6SgIn97n0L66g769nS638vS9.jpg",
    vote_average: 8.2
  },
  {
    id: 5,
    title: "The Dark Knight",
    poster_path: "/qJ2tWGBbeZ9YTIv0u856mN64llG.jpg",
    vote_average: 8.9
  }
];

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";

  // 🔥 Cargar populares al inicio
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
        } else {
          setMovies(MOCK_MOVIES);
        }
      } catch (error) {
        console.error("Error cargando películas populares:", error);
        setMovies(MOCK_MOVIES);
      } finally {
        setLoading(false);
      }
    };

    if (API_KEY && API_KEY !== "YOUR_TMDB_API_KEY") {
      fetchPopularMovies();
    } else {
      setMovies(MOCK_MOVIES);
    }
  }, [API_KEY]);

  // 🔎 búsqueda
  const handleSearch = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      // si borras el input, vuelve a populares
      if (API_KEY && API_KEY !== "YOUR_TMDB_API_KEY") {
        try {
          setLoading(true);
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`
          );
          const data = await res.json();
          setMovies(data.results || []);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setMovies(MOCK_MOVIES);
      }
      return;
    }

    if (API_KEY && API_KEY !== "YOUR_TMDB_API_KEY") {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(value)}&language=es-ES`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error buscando películas:", error);
      } finally {
        setLoading(false);
      }
    } else {
      const filtered = MOCK_MOVIES.filter((m) =>
        m.title?.toLowerCase().includes(value.toLowerCase())
      );
      setMovies(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 px-4 pb-12">
        {/* TITULO */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-red-600">
            CHILLFLIX
          </h1>
          <p className="text-gray-400 mt-2">
            Películas y series
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex justify-center mb-10">
          <Search
            terminoDeBusqueda={query}
            setTerminoDeBusqueda={handleSearch}
          />
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-400 mb-6">
            Cargando...
          </p>
        )}

        {/* GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            !loading && (
              <p className="text-center col-span-full text-gray-400">
                No se encontraron películas
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
