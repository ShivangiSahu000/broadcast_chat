
// Create a new WebSocket connection to the server
const socket = new WebSocket('ws://localhost:8080');


// Get references to the HTML elements
const usernameInput = document.getElementById('username');
const usernameHeader = document.getElementById('username-header');
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

// Event handler for when the WebSocket connection is opened
socket.onopen = () => {
    console.log('Connected to WebSocket server');
};

// Event handler for when a message is received from the server
socket.onmessage = (event) => {
    // Parse the incoming data as JSON
    const data = JSON.parse(event.data);

    // Create a new div element for the message
    const messageElement = document.createElement('div');
    messageElement.textContent = data.message;
    messageElement.classList.add('message');

    // Add a different class for system messages
    if (data.type === 'system') {
        messageElement.classList.add('system');
    }

    // Append the message to the chat box and scroll to the bottom
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
};

// Event handler for when the WebSocket connection is closed
socket.onclose = () => {
    console.log('Disconnected from WebSocket server');
};

// Event listener for when the user presses a key in the username input field
usernameInput.addEventListener('keypress', (event) => {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        // Get the username from the input field
        const username = usernameInput.value;

        // Send the username to the server
        socket.send(JSON.stringify({ type: 'setUsername', username }));

        // Update the UI to display the username
        usernameHeader.textContent = `Hello, ${username}`;
        usernameInput.style.display = 'none';
        messageInput.style.display = 'block';
    }
});

// Event listener for when the user presses a key in the message input field
messageInput.addEventListener('keypress', (event) => {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        // Get the message from the input field
        const message = messageInput.value;

        // Send the message to the server
        socket.send(JSON.stringify({ type: 'message', message }));

        // Clear the message input field
        messageInput.value = '';
    }
});
