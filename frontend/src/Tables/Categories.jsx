import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box } from "@mui/material";
import Header from "../Components/Header";

// // Utility function to get cookies by name
// const getCookie = (name) => {
//   let value = `; ${document.cookie}`;
//   let parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// };

const Category = ({  setFilterList, setCategoriesInput }) => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Number of categories per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      // const token = getCookie("access_token");
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No access token found. Redirecting to login...");
        navigate("/"); // Redirect to login page if no token
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data);

        const categoryOptions = response.data.map((category) => ({
          id: category.id,
          name: category.name,
        }));

        setCategoriesInput(categoryOptions);
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (error.response && error.response.status === 401) {
          navigate("/"); // Redirect to login if token is invalid
        }
      }
    };

    fetchCategories();
  }, [navigate, setCategoriesInput]);

  const handleAllProducts = () => {
    setFilterList([]); // Clear the filter list for all products
    navigate("/products");
  };

  const handleCategoryClick = (categoryId, category_name) => {
    setFilterList([{ id: categoryId, name: category_name }]); // Add the selected category to the filter list in object format
    navigate("/products");
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const displayedCategories = categories.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#3f51b5" }}>Categories</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={handleAllProducts}
          sx={{
            backgroundColor: "#1976d2",
            ":hover": { backgroundColor: "#1565c0" },
            padding: "10px 20px",
            fontWeight: "bold",
            boxShadow: 3,
          }}
        >
          All Products
        </Button>
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
        <Table>
          <TableHead sx={{ backgroundColor: "#f4f4f4" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>S.No</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Category Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedCategories.map((category) => (
              <TableRow
                key={category.id}
                hover
                onClick={() => handleCategoryClick(category.id, category.name)}
                sx={{
                  "&:hover": { backgroundColor: "#eeeeee", cursor: "pointer" },
                  borderBottom: "1px solid #ddd",
                }}
              >
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{new Date(category.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(categories.length / itemsPerPage)}
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
    </div>
  );
};

export default Category;













// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box } from "@mui/material";
// import Header from "../Components/Header";


// const Category = ({ filterList , setFilterList ,setCategoriesInput , categoriesInput}) => {
//   const [categories, setCategories] = useState([]);
//   const [page, setPage] = useState(1); // Pagination state
//   const itemsPerPage = 5; // Number of categories per page
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch categories
//     axios.get("http://127.0.0.1:8000/api/categories/")
//       .then(response => {
//         setCategories(response.data);
       

//         const categoryOptions = response.data.map(category => ({
//           id: category.id, 
//           name: category.name
//         }));
    
//         setCategoriesInput(categoryOptions);
//       })
//       .catch(error => console.error("Error fetching categories:", error));
//   }, []);

//   const handleAllProducts = () => {
//     console.log("setCategoriesInput", categoriesInput);
//     setFilterList([]); // Clear the filter list for all products
//     navigate("/products");
//   };

  

//   const handleCategoryClick = (categoryId,category_name) => {
//     // setFilterList([categoryId , category_name]); // Add the selected category to the filter list
//     setFilterList([{id: categoryId, name: category_name}]); // Add the selected category to the filter list in object format

//     console.log("filterList", filterList);
//     navigate("/products");
//   };

//   // Function to handle page change
//   const handlePageChange = (_, value) => {
//     setPage(value);
//   };

//   // Get categories for the current page
//   const displayedCategories = categories.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   return (
//     <div>
//       <Header />
//       <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#3f51b5" }}>Categories</h1>
//       <Box 
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mb: 3
//         }}
//       >
//         <Button 
//           variant="contained" 
//           onClick={handleAllProducts} 
//           sx={{
//             backgroundColor: "#1976d2", 
//             ":hover": { backgroundColor: "#1565c0" }, 
//             padding: "10px 20px", 
//             fontWeight: "bold",
//             boxShadow: 3,
//           }}
//         >
//           All Products
//         </Button>
//       </Box>
//       <TableContainer 
//         component={Paper} 
//         sx={{
//           boxShadow: 10, 
//           marginBottom: 3, 
//           borderRadius: "10px", 
//           maxWidth: "80%", 
//           margin: "0 auto"
//         }}
//       >
//         <Table>
//           <TableHead sx={{ backgroundColor: "#f4f4f4" }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>S.No</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Category Name</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Description</TableCell>

//               <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>Date</TableCell>

//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayedCategories.map((category) => (
//               <TableRow 
//                 key={category.id} 
//                 hover 
//                 onClick={() => handleCategoryClick(category.id ,category.name)} 
//                 sx={{
//                   "&:hover": { backgroundColor: "#eeeeee", cursor: "pointer" },
//                   borderBottom: "1px solid #ddd",
//                 }}
//               >
//                 <TableCell>{category.id}</TableCell>
//                 <TableCell>{category.name}</TableCell>
//                 <TableCell>{category.description}</TableCell>

//                 <TableCell> {new Date(category.created_at).toLocaleDateString()}</TableCell>


//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ display: "flex", justifyContent: "center" }}>
//         <Pagination
//           count={Math.ceil(categories.length / itemsPerPage)}
//           page={page}
//           onChange={handlePageChange}
//           sx={{
//             "& .MuiPaginationItem-root": {
//               fontSize: "1rem",
//               fontWeight: "bold",
//               color: "#3f51b5",
//             },
//             mt: 3, // spacing above pagination
//             boxShadow: 3,
//             borderRadius: 5,
//             backgroundColor: "#f5f5f5",
//             padding: "10px 20px"
//           }}
//         />
//       </Box>
//     </div>
//   );
// };

// export default Category;
