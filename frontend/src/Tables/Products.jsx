import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  TextField,
} from "@mui/material";
import { Autocomplete } from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";

const Product = ({
  filterList,
  categoriesInput,
  setFilterList,
}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');  // State to track search input
  const [sortPriceOrder, setSortPriceOrder] = useState('asc'); // State to track sorting order (ascending or descending)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("Access token is missing");
          return;
        }
  
        let fetchedProducts = [];
  
        if (filterList.length === categoriesInput.length || filterList.length === 0) {
          const response = await axios.get("http://127.0.0.1:8000/api/products/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchedProducts = response.data;

        } else {
          const promises = filterList.map((category) =>
            axios.get(`http://127.0.0.1:8000/api/products/?category=${category.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          );
  
          const results = await Promise.all(promises);
          fetchedProducts = results.flatMap((response) => response.data);
        }

        // Sort products by price based on the sortPriceOrder state
        if (sortPriceOrder === 'asc') {
          fetchedProducts.sort((a, b) => a.price - b.price);
        } else {
          fetchedProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts(); // Initial fetch without search query
  
  }, [filterList, sortPriceOrder]);  // It will re-run when filters or sortPriceOrder change
  
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Access token is missing");
        return;
      }
  
      let fetchedProducts = [];
  
      if (searchQuery) {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/search/?q=${searchQuery}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        fetchedProducts = response.data;
      }
  
      // Sort products by price
      if (sortPriceOrder === 'asc') {
        fetchedProducts.sort((a, b) => a.price - b.price);
      } else {
        fetchedProducts.sort((a, b) => b.price - a.price);
      }

      setProducts(fetchedProducts);  // Update the products with the result of the search query
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };
  
  const handleBack = () => {
    navigate("/categories");
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (event, newValue) => {
    // Update filterList dynamically based on selected categories
    const updatedFilterList = newValue.map((name) => {
      const selectedCategory = categoriesInput.find(
        (category) => category.name === name
      );
      return { id: selectedCategory.id, name: selectedCategory.name };
    });
    setFilterList(updatedFilterList);
  };

  const indexOfLastProduct = page * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Toggle sorting order for price
  const handleSortPrice = () => {
    setSortPriceOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="product">
      <Header />
      <Box sx={{ padding: 4, backgroundColor: "#fff", minHeight: "100vh" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#3f51b5",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          Products
        </Typography>

        <Box
  sx={{
    display: "flex",
    justifyContent: "space-between", // Spread out the items
    alignItems: "center", // Align items vertically in the center
    marginBottom: 3,
  }}
>
  <Button
    variant="contained"
    color="secondary"
    onClick={handleBack}
    sx={{
      borderRadius: 3,
      padding: "3px 10px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "translateX(-5px)",
        backgroundColor: "secondary.dark",
      },
    }}
  >
    <ArrowBackIcon sx={{ fontSize: "16px" }} /> Back
  </Button>

  {/* Add the Search TextField */}
  
 <Box 
  sx={{
    display: "flex", 
    alignItems: "center", 
    width: "250px", 
    marginLeft: "16px", 
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "2px"
  }}
>
  <TextField
    label="Search Products"
    variant="outlined"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    sx={{
      flexGrow: 1,
      borderRadius: "10px 0 0 10px", // Rounded left corners for text input
      backgroundColor: "#fff",
    }}
    InputProps={{
     
      style: {
        height: '53px', // Adjusting height of the input box
      },
    }}
    
  />
  <Button
    variant="contained"
    color="primary"
    onClick={handleSearch}  // Handle the search button click
    sx={{
      borderRadius: "0 8px 8px 0", // Round only the right corners of the button
      padding: "10px 16px", 
      height:"53px",
    }}
  >
    Search
  </Button>
</Box>

  {/* Categories Filter */}
  <Autocomplete
    multiple
    options={categoriesInput.map((category) => category.name)}
    value={filterList.map((category) => category.name) || []}
    getOptionLabel={(option) => option}
    onChange={handleFilterChange}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="outlined"
        placeholder="Add Filters"
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          width: "350px", // Adjusted width to make sure it fits
          marginLeft: "16px", // Space between Search and Filters
        }}
        
      />
    )}
    isOptionEqualToValue={(option, value) => option === value}
    ChipProps={{
      sx: {
        height: "16px",
        borderRadius: "8px",
        fontSize: "0.75rem",
        marginRight: "4px",
        padding: "0 4px",
        "& .MuiChip-deleteIcon": {
          fontSize: "12px",
        },
      },
    }}
    sx={{
      width: "100%",
      maxWidth: "400px", // Allow the Autocomplete input to stretch wider, but still fits in the row
    }}
    
  />
</Box>


        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 10,
            marginBottom: 3,
            borderRadius: "10px",
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>S.No</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>No.of Units</TableCell>
                <TableCell 
                  sx={{ fontWeight: "bold", color: "#3f51b5", cursor: "pointer" }} 
                  onClick={handleSortPrice} // Enable sorting when clicked
                >
                  Price {sortPriceOrder === 'asc' ? '↑' : '↓'}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Discount Price</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Category ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <TableCell>{index + 1 + (page - 1) * itemsPerPage}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.no_of_units}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.discount_price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#3f51b5",
              },
              mt: 3,
              boxShadow: 3,
              borderRadius: 5,
              backgroundColor: "#f5f5f5",
              padding: "10px 20px",
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Product;





// import React, { useState, useEffect } from "react";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import {
//   Button,
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Pagination,
//   TextField,
// } from "@mui/material";
// import { Autocomplete } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Header from "../Components/Header";

// const Product = ({
//   filterList,
//   categoriesInput,
//   setFilterList,
// }) => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const navigate = useNavigate();
//   console.log("categoryInput", categoriesInput);
//   console.log("filterList", filterList);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         if (!token) {
//           console.error("Access token is missing");
//           return;
//         }
  
//         let fetchedProducts = [];
  
//         if (filterList.length === categoriesInput.length || filterList.length === 0) {
//           const response = await axios.get("http://127.0.0.1:8000/api/products/", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           fetchedProducts = response.data;
//         } else {
//           const promises = filterList.map((category) =>
//             axios.get(`http://127.0.0.1:8000/api/products/?category=${category.id}`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             })
//           );
  
//           const results = await Promise.all(promises);
//           fetchedProducts = results.flatMap((response) => response.data);
//         }
//         setProducts(fetchedProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
  
//     fetchProducts();
//   }, [filterList]);
   

//   const handleBack = () => {
//     navigate("/categories");
//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleFilterChange = (event, newValue) => {

//     // Update filterList dynamically based on selected categories
//     const updatedFilterList = newValue.map((name) => {
//       const selectedCategory = categoriesInput.find(
//         (category) => category.name === name
//       );
//       return { id: selectedCategory.id, name: selectedCategory.name };
//     });
//     setFilterList(updatedFilterList);
//   };

//   const indexOfLastProduct = page * itemsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   return (
//     <div className="product">
//       <Header /> 
//     <Box sx={{ padding: 4, backgroundColor: "#fff", minHeight: "100vh" }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{
//           color: "#3f51b5",
//           fontWeight: "bold",
//           textAlign: "center",
//           marginBottom: 4,
//         }}
//       >
//         Products
//       </Typography>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 3,
//         }}
//       >
//         <Button
//   variant="contained"
//   color="secondary"
//   onClick={handleBack}
//   sx={{
//     borderRadius: 3,
//     padding: "3px 10px", // Adjust padding for icon and text
//     display: "flex",
//     alignItems: "center",
//     gap: "5px", // Space between text and icon
//     transition: "transform 0.3s ease", // Add animation for hover
//     "&:hover": {
//       transform: "translateX(-5px)", // Move button slightly to the left
//       backgroundColor: "secondary.dark", // Darken on hover
//     },
//   }}
// >
//   <ArrowBackIcon sx={{ fontSize: "16px" }} /> {/* Add Arrow Icon */}
//   Back
// </Button>


        
          
// <Box
//   sx={{
//     display: "flex",
//     justifyContent: "flex-end",
//     width: "100%",
//     paddingTop: "16px",
//   }}
// >
//   <Autocomplete
//     multiple
//     options={categoriesInput.map((category) => category.name)}
//     value={filterList.map((category) => category.name) || []}
//     getOptionLabel={(option) => option}
//     onChange={handleFilterChange}
//     renderInput={(params) => (
//       <TextField
//         {...params}
//         variant="outlined"
//         placeholder="Add Filters"
//         sx={{
//           backgroundColor: "#fff",
//           borderRadius: "8px",
//           width: "400px", // Increased width for the input
//         }}
//       />
//     )}
//     isOptionEqualToValue={(option, value) => option === value}
//     ChipProps={{
//       sx: {
//         height: "16px",
//         borderRadius: "8px",
//         fontSize: "0.75rem",
//         marginRight: "4px",
//         padding: "0 4px",
//         "& .MuiChip-deleteIcon": {
//           fontSize: "12px",
//         },
//       },
//     }}
//     sx={{
//       width: "100%",
//       maxWidth: "450px", // Allow the Autocomplete input to stretch wider
//     }}
//   />
// </Box>






//         </Box>
     

//       <TableContainer
//         component={Paper}
//         sx={{
//           boxShadow: 10,
//           marginBottom: 3,
//           borderRadius: "10px",
//           maxWidth: "80%",
//           margin: "0 auto",
//         }}
//       >
//         <Table sx={{ minWidth: 700 }}>
//           <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>S.No</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Product Name</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>No.of Units</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Price</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Discount Price</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Category ID</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {currentProducts.map((product, index) => (
//               <TableRow
//                 key={product.id}
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "#f5f5f5",
//                     cursor: "pointer",
//                   },
//                   borderBottom: "1px solid #ddd",
//                 }}
//               >
//                 <TableCell>{index + 1 + (page - 1) * itemsPerPage}</TableCell>
//                 <TableCell>{product.name}</TableCell>
//                 <TableCell>{product.no_of_units}</TableCell>
//                 <TableCell>{product.price}</TableCell>
//                 <TableCell>{product.discount_price}</TableCell>
//                 <TableCell>{product.category}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ display: "flex", justifyContent: "center" }}>
//         <Pagination
//           count={Math.ceil(products.length / itemsPerPage)}
//           page={page}
//           onChange={handlePageChange}
//           sx={{
//             "& .MuiPaginationItem-root": {
//               fontSize: "1rem",
//               fontWeight: "bold",
//               color: "#3f51b5",
//             },
//             mt: 3,
//             boxShadow: 3,
//             borderRadius: 5,
//             backgroundColor: "#f5f5f5",
//             padding: "10px 20px",
//           }}
//         />
//       </Box>
//     </Box>
//     </div>
//   );
// };

// export default Product;
