import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MovieCard.css";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <button 
      className="movie-card-button"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="movie-card">
        <img
          src={movie.poster_url || "/default-poster.jpg"}
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-genre">{movie.genre}</p>
          <p className="movie-year">{movie.release_year}</p>
        </div>
      </div>
    </button>
  );
}