// const express = require("express");
const http = require("http");
const cors = require("cors");
const WebSocket = require("ws");
const { Socket } = require("dgram");
const { SocketLogger } = require("./logs/winston");
const { NewRoom } = require("./types/Room");

// const app = express();

// app.use(cors({
//     origin : "*",
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended:false}));


// const server = http.createServer(app);

const room = NewRoom();
wss.on("connection", (ws, req) =>{
    const cookie = req.headers.cookie;
    const [_, user] = cookie.split("=");

    room.join(ws);

    ws.on("message", (msg) => {
        const jsonMsg = JSON.parse(msg);
        jsonMsg.Name = user;

        room.forwardMessage(jsonMsg);
        console.log("msg: ", msg);
    });

    ws.on("close", () => {
        room.leave(ws);
        console.log("close");
    });
})

const server = http.createServer();
const wss = new WebSocket.Server({server});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    SocketLogger.info(`Server Started on port = ${PORT}`);
});