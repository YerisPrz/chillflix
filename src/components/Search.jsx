import React from "react";

const Search = ({ terminoDeBusqueda, setTerminoDeBusqueda }) => {
  return (
    <div className="mb-10 w-full max-w-xl">
      <input
        type="text"
        placeholder="Buscar..."
        value={terminoDeBusqueda}
        onChange={(e) => setTerminoDeBusqueda(e.target.value)}
        className="w-full p-4 rounded bg-zinc-900 text-white focus:outline-none"
      />
    </div>
  );
};

export default Search;

