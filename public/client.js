const WebSocket = require('ws'); // Import the WebSocket module
const readline = require('readline'); // Import the 'readline' module to handle input from the command line

// Create a connection to the WebSocket server on port 8080
const socket = new WebSocket('ws://localhost:8080');

// Create a readline interface for reading input from the command line and outputting it
const rl = readline.createInterface({
    input: process.stdin,            // Read input from the standard input (keyboard)
    output: process.stdout          // Write output to the standard output (console)
});

// Event handler for establishing connection to the server
socket.on('open', () => {
    console.log('Connected to server'); // Log when the connection is established
});

// Event handler for receiving data from the server
socket.on('message', (data) => {
    console.log(data.toString().trim());  // Log the received data after trimming any extra spaces
});

// Event handler for reading lines from the command line input
rl.on('line', (line) => {
    socket.send(line); // Send the input line to the server
});

// Error handler for the socket connection
socket.on('error', (err) => { 
    console.error(`Server error: ${err.message}`);  // Log any errors that occur
    socket.close(); // Close the socket connection
});

// Event handler for socket connection close
socket.on('close', () => {
    console.log('Disconnected from server'); // Log when the connection is closed
});
