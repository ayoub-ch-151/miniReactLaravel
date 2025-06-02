import { useState, useRef, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  // Mock suggestion source — replace with API call if you want
  const allSuggestions = [];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Update suggestions based on input query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = allSuggestions.filter((title) =>
      title.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5)); // limit to 5 suggestions
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
      setSuggestions([]);
    }
  }

  function handleClear() {
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
    onSearch("");
  }

  function handleSuggestionClick(suggestion) {
    setQuery(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 mx-auto position-relative"
      style={{ maxWidth: "600px" }}
      role="search"
      autoComplete="off"
    >
      <div className="input-group">
        <input
          ref={inputRef}
          type="search"
          aria-label="Search movies"
          className="form-control"
          placeholder="Search by title, genre, or actor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-autocomplete="list"
          aria-controls="search-suggestion-list"
          aria-haspopup="listbox"
        />
        {query && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleClear}
            title="Clear search"
          >
            &times;
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!query.trim()}
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul
          id="search-suggestion-list"
          role="listbox"
          className="list-group position-absolute w-100"
          style={{ zIndex: 1000, top: "100%", left: 0 }}
        >
          {suggestions.map((suggestion, i) => (
            <li
              key={suggestion}
              role="option"
              className="list-group-item list-group-item-action"
              onClick={() => handleSuggestionClick(suggestion)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSuggestionClick(suggestion);
                }
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
