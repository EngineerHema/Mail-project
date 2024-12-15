import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './style/SearchBar.css';  // Make sure to import the CSS file

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="searchbar-container">
      <Form.Control
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="form-control"
      />
      <Button variant="primary" onClick={handleSearch} className="btn-primary">
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
