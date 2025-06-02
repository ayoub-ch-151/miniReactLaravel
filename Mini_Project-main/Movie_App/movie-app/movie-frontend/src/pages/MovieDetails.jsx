import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(() => {
    console.log("Current token:", token);
    console.log("Current user:", user);
  }, [token, user]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setEditedMovie(res.data);
      })
      .catch((err) => {
        console.error("Error loading movie:", err);
        setError("Failed to load movie details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEdit = () => {
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login");
      return;
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login");
      return;
    }
    try {
      console.log("Sending update request with token:", token);
      // Ensure all required fields are present
      const updateData = {
        title: editedMovie.title,
        summary: editedMovie.summary,
        release_year: parseInt(editedMovie.release_year),
        duration: parseInt(editedMovie.duration),
        genre: editedMovie.genre,
        poster_url: editedMovie.poster_url,
        director_id: editedMovie.director_id,
        actors: editedMovie.actors || []
      };
      console.log("Update data:", updateData);
      console.log("Request headers:", {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      const response = await api.put(`/movies/${id}`, updateData);
      console.log("Update response:", response.data);
      setMovie(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Update error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
        setError(`Validation errors:\n${errorMessages}`);
      } else {
        setError("Failed to update movie. Please make sure you are logged in.");
      }
    }
  };

  const handleDelete = async () => {
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login");
      return;
    }
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        console.log("Sending delete request with token:", token);
        await api.delete(`/movies/${id}`);
        navigate("/");
      } catch (error) {
        console.error("Delete error:", error.response || error);
        setError("Failed to delete movie. Please make sure you are logged in.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('actor_')) {
      const [_, index, field] = name.split('_');
      setEditedMovie((prev) => ({
        ...prev,
        actors: prev.actors.map((actor, i) => 
          i === parseInt(index) ? { ...actor, [field]: value } : actor
        )
      }));
    } else {
      setEditedMovie((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addActor = () => {
    setEditedMovie((prev) => ({
      ...prev,
      actors: [...(prev.actors || []), { id: '', role: '' }]
    }));
  };

  const removeActor = (index) => {
    setEditedMovie((prev) => ({
      ...prev,
      actors: prev.actors.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie) return null;

  return (
    <div className="movie-details-container">
      <Link to="/" className="back-button">
        &larr; Back to Movies
      </Link>
      
      <div className="movie-card">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={movie.poster_url || "/default-poster.jpg"}
              alt={movie.title}
              className="movie-poster"
              loading="lazy"
            />
          </div>
          <div className="col-md-8">
            <div className="movie-info">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editedMovie.title}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Movie Title"
                    required
                  />
                  <input
                    type="text"
                    name="genre"
                    value={editedMovie.genre}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Genre"
                    required
                  />
                  <input
                    type="number"
                    name="release_year"
                    value={editedMovie.release_year}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Release Year"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                  <input
                    type="number"
                    name="duration"
                    value={editedMovie.duration}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Duration (in minutes)"
                    min="1"
                    required
                  />
                  <input
                    type="text"
                    name="poster_url"
                    value={editedMovie.poster_url || ""}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Poster URL"
                  />
                  <textarea
                    name="summary"
                    value={editedMovie.summary}
                    onChange={handleInputChange}
                    className="edit-textarea"
                    placeholder="Movie Summary"
                    required
                  />
                   <div className="admin-controls">
                    <button onClick={handleSave} className="save-button">
                      Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                 
                  <div className="actors-section" style={{ visibility: 'hidden' }}>
                    <h3>Actors</h3>
                    {(editedMovie.actors || []).map((actor, index) => (
                      <div key={index} className="actor-input-group">
                        <input
                          type="text"
                          name={`actor_${index}_id`}
                          value={actor.id}
                          onChange={handleInputChange}
                          className="edit-input"
                          placeholder="Actor ID"
                          required
                        />
                        <input
                          type="text"
                          name={`actor_${index}_role`}
                          value={actor.role}
                          onChange={handleInputChange}
                          className="edit-input"
                          placeholder="Role"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeActor(index)}
                          className="remove-actor-button"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addActor}
                      className="add-actor-button"
                    >
                      Add Actor
                    </button>
                  </div>

                 
                </>
              ) : (
                <>
                  <h1 className="movie-title">{movie.title}</h1>
                  <span className="movie-genre">{movie.genre}</span>
                  <p className="movie-year">Released: {movie.release_year}</p>
                  
                  <p className="movie-duration">Duration: {movie.duration} min</p>
                  <p className="movie-summary">{movie.summary}</p>
                  {token && (
                    <div className="admin-controls">
                      <button onClick={handleEdit} className="edit-button">
                        Edit Movie
                      </button>
                      <button onClick={handleDelete} className="delete-button">
                        Delete Movie
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
