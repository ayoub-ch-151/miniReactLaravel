import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/AddMovie.css";

export default function AddMovie() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    release_year: "",
    director_id: "",
    duration: "",
    summary: "",
    poster_url: "",
    actors: []
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Please log in to add a movie");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const movieData = {
        ...movie,
        release_year: parseInt(movie.release_year),
        duration: parseInt(movie.duration),
        director_id: parseInt(movie.director_id),
        actors: movie.actors || []
      };

      console.log("Sending movie data:", movieData);
      const response = await api.post("/movies", movieData);
      console.log("Response:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Add movie error:", error.response?.data || error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
        setError(`Validation errors:\n${errorMessages}`);
      } else {
        setError("Failed to add movie. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-movie-container">
      <h1 className="add-movie-title">Add New Movie</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="add-movie-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movie.genre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="release_year">Release Year</label>
          <input
            type="number"
            id="release_year"
            name="release_year"
            value={movie.release_year}
            onChange={handleInputChange}
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="director_id">Director ID</label>
          <input
            type="number"
            id="director_id"
            name="director_id"
            value={movie.director_id}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={movie.duration}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="poster_url">Poster URL</label>
          <input
            type="url"
            id="poster_url"
            name="poster_url"
            value={movie.poster_url}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={movie.summary}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
} 