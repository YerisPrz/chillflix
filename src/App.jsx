// Este proyecto va con lo que he aprendido de React y los videos que me mandaste.
// Es una web de películas y series que utiliza la API de TMDB. Como todavía no tengo una API Key activa,
// agregué algunas películas de respaldo para que la aplicación pueda mostrar contenido mientras sigo desarrollándola.
//
// Ahora mismo la página se recarga sola siempre. Estoy buscando la causa del problema para poder solucionarlo.
// También la opción de series está dando problemas y por el momento solo se muestran películas.
//
// Para próximas actualizaciones quiero agregar una página de detalles para cada película o serie,
// un carrusel de películas populares, un top de películas y series más vistas,
// y mover el buscador junto al menú para que la interfaz se vea más organizada.
//
// Por ahora esto es lo que tengo. Cualquier recomendación o sugerencia es bienvenida.

import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";

// Películas de ejemplo para mostrar algo
// cuando no tengo una API Key configurada
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

  // Aquí guardo las películas que se mostrarán
  const [movies, setMovies] = useState([]);

  // Guarda lo que escribe el usuario en el buscador
  const [query, setQuery] = useState("");

  // Sirve para mostrar el mensaje de carga
  const [loading, setLoading] = useState(false);

  // Obtiene la API Key desde el archivo .env
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";

  // Este useEffect se ejecuta cuando inicia la página
  useEffect(() => {

    // Función para cargar películas populares
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`
        );

        const data = await res.json();

        // Si llegan películas las guardamos
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
        } else {
          // Si algo falla usamos las películas de respaldo
          setMovies(MOCK_MOVIES);
        }

      } catch (error) {
        console.error("Error cargando películas populares:", error);

        // Si hay error mostramos las películas de ejemplo
        setMovies(MOCK_MOVIES);

      } finally {
        setLoading(false);
      }
    };

    // Si existe una API Key válida usamos TMDB
    if (API_KEY && API_KEY !== "YOUR_TMDB_API_KEY") {
      fetchPopularMovies();
    } else {
      // Si no hay API mostramos datos locales
      setMovies(MOCK_MOVIES);
    }

  }, [API_KEY]);

  // Función para buscar películas
  const handleSearch = async (value) => {

    // Guarda el texto escrito
    setQuery(value);

    // Si el usuario borra el buscador
    if (!value.trim()) {

      // Volvemos a mostrar las películas populares
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

    // Si tengo API Key hago la búsqueda en TMDB
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

      // Si no tengo API Key busco dentro del arreglo local
      const filtered = MOCK_MOVIES.filter((m) =>
        m.title?.toLowerCase().includes(value.toLowerCase())
      );

      setMovies(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Barra de navegación */}
      <Navbar />

      <div className="pt-24 px-4 pb-12">

        {/* Título principal */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-red-600">
            CHILLFLIX
          </h1>

          <p className="text-gray-400 mt-2">
            Películas y series
          </p>
        </div>

        {/* Buscador */}
        <div className="flex justify-center mb-10">
          <Search
            terminoDeBusqueda={query}
            setTerminoDeBusqueda={handleSearch}
          />
        </div>

        {/* Mensaje de carga */}
        {loading && (
          <p className="text-center text-gray-400 mb-6">
            Cargando...
          </p>
        )}

        {/* Contenedor de películas */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {movies.length > 0 ? (

            // Recorre el arreglo y crea una tarjeta por película
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))

          ) : (

            // Mensaje cuando no hay resultados
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