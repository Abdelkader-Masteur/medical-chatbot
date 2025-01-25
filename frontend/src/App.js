import React from "react";
import Chat from "./components/Chat";
import { CssBaseline, Box, Typography } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "#121212",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#ffffff",
            mb: 4,
            fontWeight: "bold",
          }}
        >
          Medical Chatbot
        </Typography>
        <Chat />
      </Box>
    </>
  );
}

export default App;
