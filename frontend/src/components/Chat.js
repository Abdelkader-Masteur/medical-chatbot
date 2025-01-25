import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = new WebSocket("ws://localhost:8000/ws");

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setMessages((prev) => [...prev, data]);
  };

  const sendMessage = () => {
    if (input) {
      socket.send(input);
      setMessages((prev) => [...prev, { sender: "user", text: input }]);
      setInput("");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 5,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          backgroundColor: "#1976d2",
          color: "#fff",
          p: 2,
        }}
      >
        Medical Chatbot
      </Typography>
      <Paper
        elevation={3}
        sx={{
          height: 400,
          overflowY: "auto",
          p: 2,
          bgcolor: "#f5f5f5",
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                textAlign: msg.sender === "user" ? "right" : "left",
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 1,
                  bgcolor: msg.sender === "user" ? "#1976d2" : "#e0e0e0",
                  color: msg.sender === "user" ? "#fff" : "#000",
                  borderRadius: 2,
                  maxWidth: "70%",
                }}
              >
                <ListItemText primary={msg.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: "flex", p: 2, borderTop: "1px solid #ddd" }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
