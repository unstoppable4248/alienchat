const { v4 } = require("uuid");
const Mutex = require("async-mutex").Mutex;
const mutex = new Mutex();
let count = 0;
let roomsQueue = [];

function handleConnection(socket, io) {
  socket.on("connected", () => {
    io.emit("online-count", ++count);
    socket.leaveAll();
  });

  socket.on("online-members-count", () => {
    io.emit("online-count", count);
  });

  socket.on("send-message", (data) => {
    io.to(Array.from(socket.rooms)).emit("receive-message", data);
  });

  socket.on("disconnecting", () => {
    if (Array.from(socket.rooms).some((element) => roomsQueue.includes(element))) roomsQueue = [];
    socket.to(Array.from(socket.rooms).length === 0 ? "random" : Array.from(socket.rooms)).emit("alien-disconnected", true);
  });

  socket.on("leave-all", () => {
    socket.leaveAll();
  });

  socket.on("join-room", async () => {
    socket.leaveAll();
    const release = await mutex.acquire();
    try {
      if (roomsQueue.length === 0) {
        let randomID = "room-id: " + v4();
        roomsQueue.push(randomID);
        socket.join(randomID);
        socket.to(Array.from(socket.rooms)).emit("room-count", Array.from(io.sockets.adapter.rooms.get(Array.from(socket.rooms)[0])).length);
        console.log("connected 1 unique", socket.rooms, socket.id);
      } else if (roomsQueue.length === 1) {
        socket.join(roomsQueue.shift());
        socket.to(Array.from(socket.rooms)).emit("room-count", Array.from(io.sockets.adapter.rooms.get(Array.from(socket.rooms)[0])).length);
        console.log("connected 2 same ", socket.rooms, socket.id);
      }
    } finally {
      release();
    }
  });

  socket.on("disconnect", () => {
    io.emit("online-count", --count);
    console.log("Connection closed");
  });
}

module.exports = { handleConnection };
