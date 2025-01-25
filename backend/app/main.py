import random
from fastapi import FastAPI, WebSocket
from fastapi.websockets import WebSocketDisconnect
import asyncio

app = FastAPI()

# manage active WebSocket connections
class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    # accept and add a WebSocket connection
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: dict, websocket: WebSocket):
        await websocket.send_json(message)

manager = ConnectionManager()

bot_responses = [
    "I'm here to help you with your medical queries.",
    "Can you tell me more about your symptoms?",
    "I'm a chatbot, but I'll try my best to assist you.",
    "Stay calm, I'm processing your request.",
    "I'm sorry to hear you're feeling unwell. Let's figure this out together.",
    "Please provide more details so I can assist you better.",
]

# WebSocket endpoint to handle client connections and interactions
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            user_message = await websocket.receive_text()
            
            bot_response = random.choice(bot_responses)

            response_message = {
                "sender": "bot",
                "text": bot_response
            }
            
            await manager.send_message(response_message, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
