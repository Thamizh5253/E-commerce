import React, { useState, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import "./App.css";
import axios from "axios";

import LoginForm from "./Auth/Login";
import RegistrationForm from "./Auth/Register";
import ToggleButtons from "./Auth/ToggleButtons";
import Category from "./Tables/Categories";
import Product from "./Tables/Products";
import Test from "./Tables/Test";

// Utility function to get cookies by name
const getCookie = (name) => {
  let value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

// Utility function to check if the access token is valid
const isAccessTokenValid = async () => {
  const token = getCookie("access_token");
  if (!token) return false;

  try {
    const response = await axios.get("http://localhost:8000/protected-endpoint/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [filterList, setFilterList] = useState([]);
  const [categoriesInput, setCategoriesInput] = useState([]);
  const [csrfToken, setCsrfToken] = useState(null);
  // const navigate = useNavigate();

  // Fetch CSRF token on app load
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("http://localhost:8000/csrf_token/"); // URL to get CSRF token
        setCsrfToken(response.data.csrfToken);

        // Set CSRF token in axios defaults if found
        axios.defaults.headers.common["X-CSRFToken"] = response.data.csrfToken;
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    // // Check for valid access token on app load or page refresh
    // const validateTokens = async () => {
    //   const validToken = await isAccessTokenValid();
    //   if (!validToken) {
    //     navigate("/"); // Redirect to login page if token is not valid
    //   }
    // };

    // validateTokens();
    fetchCsrfToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />} />
        <Route
          path="/categories"
          element={
            <Category
              filterList={filterList}
              setFilterList={setFilterList}
              setCategoriesInput={setCategoriesInput}
              categoriesInput={categoriesInput}
            />
          }
        />
        <Route
          path="/products"
          element={
            <Product
              setFilterList={setFilterList}
              setCategoriesInput={setCategoriesInput}
              filterList={filterList}
              categoriesInput={categoriesInput}
            />
          }
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

function Home({ isLogin, setIsLogin }) {
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px", overflow: "hidden" }}>
        <ToggleButtons isLogin={isLogin} setIsLogin={setIsLogin} />
        {/* Display login or registration form based on the isLogin state */}
        {isLogin ? <LoginForm /> : <RegistrationForm />}
      </Paper>
    </Container>
  );
}

export default App;






// import React, { useState } from "react";
// import { Container, Paper } from "@mui/material";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import LoginForm from "./Auth/Login";
// import RegistrationForm from "./Auth/Register";
// import ToggleButtons from "./Auth/ToggleButtons";
// import Category from "./Tables/Categories";
// import Product from "./Tables/Products";
// import Test from "./Tables/Test";

// function App() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [filterList, setFilterList] = useState([]);

//   const [categoriesInput , setCategoriesInput] = useState([]);
//   return (
//     <Router>
//       <Routes>
//         {/* Root Route for Login / Registration */}
//         <Route path="/" element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />} />

//         {/* Route for Categories */}
//         {/* <Route path="/categories" element={<CategoriesTable />} /> */}

//         {/* Route for Products
//         <Route path="/products" element={<ProductTable />} /> */}
//          {/* Dynamic Route for Products with Category ID */}
//          {/* <Route 
//           path="/products/:categoryId" 
//           element={<ProductTable />} 
//         /> */}
// <Route 
//   path="/categories" 
//   element={<Category filterList={filterList} setFilterList={setFilterList} setCategoriesInput={setCategoriesInput} categoriesInput={categoriesInput}/>} 
// />     
//    <Route 
//   path="/products" 
//   element={<Product setFilterList={setFilterList} setCategoriesInput={setCategoriesInput} filterList={filterList} categoriesInput={categoriesInput} />} 
// />
// <Route 
//   path="/test" 
//   element={<Test  />} 
// />
//       </Routes>
//     </Router>
//   );
// }

// function Home({ isLogin, setIsLogin }) {
//   return (
//     <Container maxWidth="sm" style={{ marginTop: "50px" }}>
//       <Paper elevation={3} style={{ padding: "20px", overflow: "hidden" }}>
//         <ToggleButtons isLogin={isLogin} setIsLogin={setIsLogin} />

//         {/* Display login or registration form based on the isLogin state */}
//         {isLogin ? <LoginForm /> : <RegistrationForm />}
//       </Paper>
//     </Container>
//   );
// }

// export default App;


