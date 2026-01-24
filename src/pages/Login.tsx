import { Button, Box, Paper, Typography } from "@mui/material";
import React from "react";

export const Login: React.FC = () => {
  const baseUrl = ((import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:8080")
    .replace(/\/+$/, "");

  const handleLogin = () => {
    window.location.href = `${baseUrl}/oauth2/authorization/github`;
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={6} sx={{ padding: 4, width: 360 }}>
        <Typography variant="h5" gutterBottom>
          Sign in
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Use GitHub to continue.
        </Typography>
        <Button variant="contained" onClick={handleLogin}>
          Sign in with GitHub
        </Button>
      </Paper>
    </Box>
  );
};
