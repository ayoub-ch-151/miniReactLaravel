import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

export default function App() {
  const { token, user, logout } = useContext(AuthContext);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-container">
          <Link className="navbar-brand" to="/">
            <span className="navbar-logo">🎬</span>
            <span className="navbar-title">MovieApp</span>
          </Link>
          
          <div className="navbar-actions">
            {token ? (
              <div className="navbar-user">
                <span className="navbar-welcome">Welcome, {user?.name}</span>
                <button className="navbar-button logout" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-auth">
                <Link className="navbar-button login" to="/login">
                  Login
                </Link>
                <Link className="navbar-button register" to="/register">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}