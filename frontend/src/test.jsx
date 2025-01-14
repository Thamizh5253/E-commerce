import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('http://127.0.0.1:8000/api/categories/')
      .then((response) => {
        // Set categories data from response
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts.

  // Return a loading state, error message, or the table with data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Categories Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{new Date(category.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
