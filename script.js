let socket;

document.getElementById('connectBtn').onclick = function() {
    const ipAddress = document.getElementById('ipAddress').value;
    socket = new WebSocket(`ws://${ipAddress}:8080`);

    socket.onopen = function() {
        document.getElementById('status').innerText = 'Connected to server';
    };

    socket.onmessage = function(event) {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML += `<div>${event.data}</div>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
    };

    socket.onerror = function(error) {
        document.getElementById('status').innerText = 'WebSocket error: ' + error.message;
    };

    socket.onclose = function() {
        document.getElementById('status').innerText = 'Disconnected from server';
    };
};

document.getElementById('sendBtn').onclick = function() {
    const message = document.getElementById('message').value;
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        document.getElementById('message').value = ''; // Clear the input field
    } else {
        document.getElementById('status').innerText = 'Connection is not open';
    }
};
 
