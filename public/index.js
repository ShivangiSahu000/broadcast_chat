const express = require('express'); // Import the Express library to create a web server
const http = require('http');   // Import the HTTP library to create a web server
const path = require('path');   // Import the 'path' module for handling and transforming file paths
const WebSocket = require('ws');  // Import WebSocket for real-time communication

const app = express();  // Create an instance of the Express application
const server = http.createServer(app);  // Create an HTTP server using the Express app
const wss = new WebSocket.Server({ server });  // Attach WebSocket server to the HTTP server

const PORT = process.env.PORT || 8080;  // Define the port to listen on, defaulting to 8080 if not provided

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle new client connections
wss.on('connection', (ws) => {
    console.log('New client connected');    // Log when a new client connects

    // Handle the 'message' event from the client to broadcast messages
    ws.on('message', (message) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);    // Broadcast the message to all clients
            }
        });
    });

    // Handle client disconnections
    ws.on('close', () => {
        console.log('Client disconnected'); // Log when a client disconnects
    });
});

// Start the server and listen on the defined port
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  // Log that the server is running
});
