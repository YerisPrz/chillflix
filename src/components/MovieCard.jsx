import React from "react";

const MovieCard = ({ movie }) => {
  const title = movie.title || movie.name || "Sin título";

  return (
    <div className="group bg-zinc-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition">

      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=80"
        }
        alt={title}
        referrerPolicy="no-referrer"
        className="w-full h-[320px] object-cover"
      />

      <div className="p-3">
        <h3 className="text-sm font-bold truncate">
          {title}
        </h3>

        <p className="text-xs text-gray-400">
          {movie.vote_average?.toFixed(1) || "N/A"}
        </p>
      </div>

    </div>
  );
};

export default MovieCard;

