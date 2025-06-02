import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import useMovies from "../hooks/useMovies";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { movies, loading, error, page, setPage, lastPage, setQuery } = useMovies();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(query) {
    setPage(1);
    setQuery(query);
    setSearchTerm(query);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAddMovie() {
    navigate("/movies/new");
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Discover Movies</h1>

      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="add-movie-container">
        <button onClick={handleAddMovie} className="add-movie-button">
          + Add New Movie
        </button>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && movies.length === 0 && (
        <p className="no-movies">No movies found.</p>
      )}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {!loading && !error && movies.length > 0 && (
        <div className="pagination">
          {Array.from({ length: lastPage }, (_, i) => i + 1).map((pageNum) => (
            <div
              key={pageNum}
              className={`page-item ${page === pageNum ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
