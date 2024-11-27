const cors = require("cors");



const express = require('express'); // Import the Express library
const http = require('http'); // Import the built-in Node.js HTTP module
const path = require('path'); // Import the built-in Node.js path module
const WebSocket = require('ws'); // Import the WebSocket library for real-time communication

const app = express(); // Create an instance of the Express application
app.use(
    cors({
        origin: ["http://localhost:8080"],
    })
);

const server = http.createServer(app); // Create an HTTP server using the Express app
const wss = new WebSocket.Server({ server }); // Create a WebSocket server attached to the HTTP server

const PORT = process.env.PORT || 8080; // Define the port the server will listen on, default to 8080

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected'); // Log when a new client connects
    let username; // Variable to store the username of the connected client

    // Handle incoming messages from clients
    ws.on('message', (message) => {
        const data = JSON.parse(message); // Parse the incoming message as JSON

        if (data.type === 'setUsername') {
            // If the message type is 'setUsername', set the username
            username = data.username;
            // Broadcast a system message to all connected clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'system', message: `${username} has joined the chat` }));
                }
            });
        } else if (data.type === 'message') {
            // If the message type is 'message', broadcast the message to all connected clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'message', message: `${username}: ${data.message}` }));
                }
            });
        }
    });

    // Handle client disconnections
    ws.on('close', () => {
        if (username) {
            // Broadcast a system message to all connected clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'system', message: `${username} has left the chat` }));
                }
            });
        }
        console.log('Client disconnected'); // Log when a client disconnects
    });
});

// Catch-all route to handle any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server and listen on the defined port
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

