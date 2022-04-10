//THIS PART IS TAKEN FROM MY CLASS NOTES: https://github.com/MathuraMG/ConnectionsLabSpring22/tree/master/Week_8_Sockets

//to start the server
const { randomBytes } = require("crypto");
let express = require("express");
const { all } = require("express/lib/application");
let http = require("http");

let io = require("socket.io");

let app = express();
let server = http.createServer(app); //
io = new io.Server(server);

// leaves
let leaves = [];

app.use('/', express.static("public"));

let allMessages = [];
//when a socket connects, take the socket callback, and display the id in the server
io.sockets.on("connection", (socket) => {
    console.log("we have a new client: ", socket.id);
    // add all open rooms
    if (leaves.length > 0) {
        socket.emit("prevLeaves", leaves);
    }

    //drop a message on the server when the socket disconnects
    socket.on("disconnect", () => {
        console.log("socket has been disconnected", socket.id);
    })

    //listen for a message from the client
    socket.on("msgPositionData", (data) => {
        allMessages.push(data)
            //console.log(allMessages);
        io.sockets.emit('dataFromServer', allMessages);
    })

    // leaf stuff
    socket.on('newLeaf', (data) => {
        // add leaf data to leaves
        let details = {
            name: data.name,
            room: username,
            x: Math.random(window.innerWidth),
            n: data.n
        }
        leaves.push(details);
        io.sockets.emit('newLeaf', details);
    })
})

//server listening on port
server.listen(8000, () => {
    console.log("listening in port 8000");
})