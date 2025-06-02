import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddMovie from "./pages/AddMovie.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/MovieCard.css";
import "./styles/Auth.css";
import "./styles/App.css";
// ...existing code...

// Dynamically load Bootstrap CSS
const loadBootstrap = () => {
  const bootstrapLink = document.createElement("link");
  bootstrapLink.rel = "stylesheet";
  bootstrapLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
  bootstrapLink.integrity = "sha384-ENjdO4Dr2bkBIFxQpeoYz1HiPTbI5nBOy4Z1ZlKrrljdUpZhyv+0lZ5Wc5vo2v3Q";
  bootstrapLink.crossOrigin = "anonymous";
  document.head.appendChild(bootstrapLink);
};

loadBootstrap();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="movies/:id" element={<MovieDetails />} />
            <Route path="movies/new" element={<AddMovie />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);