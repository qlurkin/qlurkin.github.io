// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3003")

// Connection opened
socket.addEventListener("open", () => {
  console.log('Connection Opened')
})

// Listen for messages
socket.addEventListener("message", () => {
  console.log("Reload")
  location.reload()
})

addEventListener("beforeunload", () => {
  socket.close()
})
