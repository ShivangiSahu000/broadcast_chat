## Click on this link to run the application 
https://wealthy-interesting-booklet.glitch.me

# Chat Application

This is a simple chat application that uses WebSocket for real-time communication between clients. The server is built using Node.js and the `ws` library, while the client interface is served using Express and plain JavaScript.

## Table of Contents

- [Instructions on How to Run the Server and Client Applications](#instructions-on-how-to-run-the-server-and-client-applications)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [Application Architecture](#application-architecture)
  - [Server-Side](#server-side)
  - [Client-Side](#client-side)
  - [Concurrency Handling](#concurrency-handling)
- [Assumptions and Design Choices](#assumptions-and-design-choices)
  - [Assumptions](#assumptions)
  - [Design Choices](#design-choices)


## Instructions on How to Run the Server and Client Applications

### Prerequisites

- Node.js installed on your system.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/chat-application.git
   cd chat-application
2. **Install dependencies:**
    ```sh
    npm install
3. **Running the server:**
    * **Start the server:**
    
      `node server.js`   
    
    * **Access the Application:**
      Open your web browser and go to

       `http://localhost:8080`

 ## Application Architecture
 ### Server-Side
 The server is built using Node.jswith the express and ws libraries. The architecture includes:
 * Express Server: Serves static files (index.html and script.js) from the public directory.
 * WebSocket Server: Manages real-time communication between clients. Each client connection is handled by creating a new WebSocket instance.

 ### Client-Side
 The client interface is a simple HTML page with an integrated JavaScript file that handles WebSocket communication. The JavaScript file:      
 * Establishes a WebSocket connection to the server.
 * Sends messages to the server.
 * Receives and displays messages from the server.
 ### Concurrency Handling
 Concurrency is handled using WebSocket connections, where each client has a dedicated connection to the server. The server can handle multiple clients simultaneously by broadcasting messages to all connected clients.
 ## Assumptions and Design Choices
### Assumptions
* User Identification: Each user is identified by a unique username, which is set when they first connect to the chat.
* Message Broadcasting: All messages sent by users are broadcasted to all connected clients.
### Design Choices
* WebSocket for Real-Time Communication: WebSocket is chosen for its efficiency in real-time bidirectional communication compared to traditional HTTP.
* Simple UI: The client-side interface is kept simple and minimalistic to focus on the core functionality of real-time chat.
* Static File Serving with Express: Express is used to serve static files, providing a straightforward way to deliver the HTML and JavaScript files to the client.

