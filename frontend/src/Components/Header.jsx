import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage dropdown menu

  // Open the dropdown menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear the authentication token (replace with your token storage logic)
    localStorage.removeItem("access_token");

    // Redirect to login page or perform other logout actions
    window.location.href = "/"; // Example of redirecting to login page

    // Close the menu
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#1976d2" }}
        >
          FineKart
        </Typography>

        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            sx={{ marginLeft: 1 }}
            onClick={handleMenuClick} // Open the dropdown menu
          >
            <AccountCircle fontSize="large" />
          </IconButton>

          <Menu
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleMenuClose} 
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorOrigin={{
              vertical: "bottom", 
              horizontal: "right",
            }}
            sx={{
              marginTop: 2, 
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
