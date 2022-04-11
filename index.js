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

app.use('/', express.static("public"));

let port = process.env.PORT || 8000; // leaves

//To limit the amount of people in each room
const MAX_USERS = 2;
// to store prev leaves
let leaves = [];

//when a socket connects, take the socket callback, and display the id in the server
io.sockets.on("connection", (socket) => {
    console.log("we have a new client: ", socket.id);

    //drop a message on the server when the socket disconnects
    socket.on("disconnect", () => {
        console.log("socket has been disconnected", socket.id);
        // delete leaf

    })

    ////////////////////////////////////
    /// Leaves
    ////////////////////////////////////
    // add all open rooms
    if (leaves.length > 0) {
        socket.emit("prevLeaves", leaves);
    }


    // leaf stuff
    socket.on('newLeaf', (data) => {
        // add leaf data to leaves
        let details = {
            name: data.name,
            room: data.room,
            x: data.width,
            n: data.n,
            speedx: data.speedx
        }
        leaves.push(details);
        io.sockets.emit('newLeaf', details);
    })

    socket.on('hideRoom', (data) => {
        io.sockets.emit('hideRoom', data);
    })

    ////////////////////////////////////
    /// PACKMAN
    ////////////////////////////////////
    //listen for a message named "directionData" from this client
    socket.on("directionData", (data) => {
        console.log("Received new direction", data);

        //send the new directions to all the servers
        io.sockets.emit("allDirData", data);

    });

})

//server listening on port
server.listen(8000, () => {
    console.log("listening in port 8000");
})