import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  // Load Bootstrap CSS dynamically
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    link.rel = "stylesheet";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <main className="container text-center mt-5" role="main" aria-labelledby="notfound-title">
      <h1 id="notfound-title" className="display-3 fw-bold mb-3 text-danger">
        404 - Page Not Found
      </h1>
      <Link to="/" className="btn btn-primary" aria-label="Go back to homepage">
        Go back home
      </Link>
    </main>
  );
}
