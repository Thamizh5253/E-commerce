import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); // for search input
  const [products, setProducts] = useState([]); // to store fetched products
  const [loading, setLoading] = useState(false); // to handle loading state
  const [error, setError] = useState(null); // to handle errors

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token"); // get the token from localStorage
      if (!token) {
        console.error("Access token is missing");
        return;
      }

      // Make the GET request with the token in the headers
      const response = await axios.get(`http://127.0.0.1:8000/api/products/search/?q=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`, // include access token here
        },
      });

      setProducts(response.data); // update the state with the response data
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h6" mb={2}>Search for Products</Typography>
      
      <TextField
        label="Search Products"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          marginBottom: "16px",
        }}
      >
        Search
      </Button>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Box>
        {products && products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}</li> // display product name here
            ))}
          </ul>
        ) : (
          <Typography>No products found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchComponent;

// import React, { useState } from "react";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";

// function MyAutocompleteComponent() {
//   // Sample category data, replacing `categoriesInput` from your code
//   const categoriesInput = [
//     { name: "Category 1" },
//     { name: "Category 2" },
//     { name: "Category 3" },
//     { name: "Category 4" },
//   ];

//   // State for selected filter(s)
//   const [selectedFilters, setSelectedFilters] = useState([]);

//   // Handle changes in the selected filters
//   const handleFilterChange = (event, newValue) => {
//     console.log("newValue", newValue);
//     setSelectedFilters(newValue);
//   };

//   return (
//     <Box sx={{ marginTop: 2 }}>
//       <Autocomplete
//         multiple
//         options={categoriesInput.map((category) => category.name)} // Extract 'name' from categoriesInput for options
//         value={selectedFilters} // Display the selected filters here
//         getOptionLabel={(option) => option} // Use the option as the label (the string itself)
//         onChange={handleFilterChange} // Trigger when selection changes
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="outlined"
//             placeholder="Add Filters"
//             sx={{
//               backgroundColor: "#fff",
//               borderRadius: 1,
//               width: "250px", // Adjusted width to fit the container
//             }}
//           />
//         )}
//         isOptionEqualToValue={(option, value) => option === value} // Compare based on string equality
//         sx={{
//           minWidth: "250px", // Ensure the Autocomplete input is wide enough
//           "& .MuiOutlinedInput-root": {
//             borderRadius: 3,
//             paddingRight: "12px !important",
//           },
//         }}
//       />

//       {/* Display selected filters */}
//       <Box sx={{ marginTop: 2 }}>
//         <h3>Selected Filters:</h3>
//         <ul>
//           {selectedFilters.map((filter, index) => (
//             <li key={index}>{filter}</li>
//           ))}
//         </ul>
//       </Box>
//     </Box>
//   );
// }

// export default MyAutocompleteComponent;
