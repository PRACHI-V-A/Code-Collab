const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const roomUsers = {};
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  console.log("User connected");

  
  socket.on("join-room", ({ roomId, username }) => {

  socket.join(roomId);

  socket.roomId = roomId;
  socket.username = username;

  if (!roomUsers[roomId]) {
    roomUsers[roomId] = [];
  }

  roomUsers[roomId].push(username);

  io.to(roomId).emit("participants-update", roomUsers[roomId]);

});

  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("receive-message", data);
  });



  socket.on("code-change", (data) => {

  socket.to(data.roomId).emit("receive-code", {
    fileName: data.fileName,
    code: data.code,
  });

});

socket.on("create-file", (data) => {

  socket.to(data.roomId).emit("file-created", {
    fileName: data.fileName,
    language: data.language,
  });

});






socket.on("delete-file", (data) => {

  socket.to(data.roomId).emit(
    "file-deleted",
    data.fileName
  );

});


socket.on("rename-file", (data) => {

  socket.to(data.roomId).emit(
    "file-renamed",
    {
      oldFileName: data.oldFileName,
      newFileName: data.newFileName,
    }
  );

});




  socket.on("disconnect", () => {

  const roomId = socket.roomId;
  const username = socket.username;

  if (roomUsers[roomId]) {

    roomUsers[roomId] = roomUsers[roomId].filter(
      (user) => user !== username
    );

    io.to(roomId).emit(
      "participants-update",
      roomUsers[roomId]
    );
  }

  console.log("User disconnected");
});

});

server.listen(8081, () => {
  console.log("Socket server running on port 8081");
});