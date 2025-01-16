import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Typography, Paper, Container } from "@mui/material";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/api/register/", {
        username,
        password,
        email,
      });
      console.log(response);                                                                                             
      alert("Registration successful. Please login.");
      setUsername("");
      setPassword("");
      setEmail("");


    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h5">Register</Typography>
        <form onSubmit={handleRegisterSubmit} noValidate style={{ width: "100%", marginTop: "16px" }}>
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
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default RegistrationForm;






