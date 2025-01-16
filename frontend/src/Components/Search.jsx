import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, CircularProgress, List, ListItem, ListItemText } from "@mui/material";

const UniversalSearchRegex = ({setProducts}) => {
  const [searchInput, setSearchInput] = useState(""); // Search box input
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Access token is missing");
        return;
      }

      // Regex Patterns
      const rangePattern = /(.+?) between (\d+)\s*to\s*(\d+)/i; // Matches: <products> between <min> and <max>
      const belowPattern = /(.+?) below (\d+)/i; // Matches: <products> below <max>
      const abovePattern = /(.+?) above (\d+)/i; // Matches: <products> above <min>
      const simplePattern = /^(.+?)$/i; // Matches: Simple search with product name only

      // Default parameters
      let queryParams = new URLSearchParams();

      // Match and extract relevant data
      if (rangePattern.test(searchInput)) {
        const match = searchInput.match(rangePattern);
        const products = match[1].trim();
        const minPrice = parseInt(match[2], 10);
        const maxPrice = parseInt(match[3], 10);

        queryParams.append("q", products);
        queryParams.append("min_price", minPrice);
        queryParams.append("max_price", maxPrice);
      } else if (belowPattern.test(searchInput)) {
        const match = searchInput.match(belowPattern);
        const products = match[1].trim();
        const maxPrice = parseInt(match[2], 10);

        queryParams.append("q", products);
        queryParams.append("max_price", maxPrice);
      } else if (abovePattern.test(searchInput)) {
        const match = searchInput.match(abovePattern);
        const products = match[1].trim();
        const minPrice = parseInt(match[2], 10);

        queryParams.append("q", products);
        queryParams.append("min_price", minPrice);
      } else if (simplePattern.test(searchInput)) {
        queryParams.append("q", searchInput.trim());
      } else {
        alert("Invalid search format. Please follow supported patterns.");
        return;
      }

      // API call
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/search/?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts(response.data); // Set the search results
    } catch (error) {
      console.error("Error during search:", error);
    }

  };

  return (
    
      

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "80%",
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "2px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{
            flexGrow: 1,
            borderRadius: "8px 0 0 8px",
            backgroundColor: "#fff",
          }}
          InputProps={{
            style: {
              height: "53px",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{
            borderRadius: "0 8px 8px 0",
            padding: "10px 16px",
            height: "53px",
          }}
        >
          Search
        </Button>
      </Box>

     
  );
};

export default UniversalSearchRegex;
