import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md border-b border-zinc-800 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <h1 className="text-red-600 font-bold text-xl">
          CHILLFLIX
        </h1>

        <div className="flex gap-6 text-sm text-gray-300">
          <span className="hover:text-white cursor-pointer">Inicio</span>
          <span className="hover:text-white cursor-pointer">Películas</span>
          <span className="hover:text-white cursor-pointer">Series</span>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
