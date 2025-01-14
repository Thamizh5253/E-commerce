import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Typography, Paper, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("1");
  const [password, setPassword] = useState("Tham@123");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/api/login/", {
        username,
        password,
      });
      console.log(response);

       localStorage.setItem("access_token", response.data.access);

      navigate("/categories");

      setError(null);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleLoginSubmit} noValidate style={{ width: "100%", marginTop: "16px" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: "16px" }}>
            Log In
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginForm;
