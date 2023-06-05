const { createServer } = require("http");
const { Server } = require("socket.io");
const { handleConnection } = require("./controllers/socketControllers");
const { instrument } = require("@socket.io/admin-ui");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  handleConnection(socket, io);
});

httpServer.listen(3001, () => {
  console.log("Server listening on port 3001");
});

instrument(io, {
  auth: false,
  mode: "development",
});
