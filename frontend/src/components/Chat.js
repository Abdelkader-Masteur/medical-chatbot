import React, { useState } from "react";
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
        width: "100%",
        margin: "auto",
        mt: 5,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 4,
        overflow: "hidden",
        bgcolor: "#212121",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          backgroundColor: "#333333",
          color: "#ffffff",
          p: 2,
          fontWeight: "bold",
        }}
      >
        Let's chat !
      </Typography>

      <Paper
        elevation={3}
        sx={{
          height: 400,
          overflowY: "auto",
          p: 2,
          bgcolor: "#1c1c1c",
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
                mb: 1,
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  bgcolor: msg.sender === "user" ? "#1976d2" : "#333333",
                  color: "#fff",
                  borderRadius: 2,
                  maxWidth: "70%",
                  boxShadow: 3,
                }}
              >
                <ListItemText primary={msg.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: "flex", p: 2, borderTop: "1px solid #444444" }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            mr: 2,
            bgcolor: "#ffffff",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#fafafa",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={sendMessage}
          sx={{
            bgcolor: "#1976d2",
            "&:hover": {
              bgcolor: "#1565c0",
            },
            textTransform: "none",
            px: 2,
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
