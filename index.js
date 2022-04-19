//THIS PART IS TAKEN FROM MY CLASS NOTES: https://github.com/MathuraMG/ConnectionsLabSpring22/tree/master/Week_8_Sockets

const { randomBytes } = require("crypto"); //created by the server once it was started (?)

// 1- For express 'app' object
let express = require("express");
const { all } = require("express/lib/application");
let app = express();
app.use('/', express.static("public"));

// 2- For the http server
let http = require("http");
let server = http.createServer(app); //
const { instrument } = require("@socket.io/admin-ui");
let port = process.env.PORT || 8000; //this is the port the server needs to listen to

// 3- For the connection with sockets.io
let io = require("socket.io");
io = new io.Server(server,  {
    cors: {
      origin: ["https://admin.socket.io"],
      credentials: true
    }
});
instrument(io, {
    auth: false
});

////4 - For communicating with CLIENT

//Variables we communicate to CLIENT side
const MAX_USERS = 2; //To limit the amount of people in each room
let leaves = []; //to store all animation of 'leaves'
let rooms = {}; // 'roomname' : number of people in room
let users = {}; // 'username' : userid


//Information that we want when a new socket connects
io.sockets.on("connection", (socket) => 
{
    console.log("we have a new client: ", socket.id); //identify new client with its id

    //we communicate user Data
    socket.on("userData", (data) => {

        //to save the username
        socket.name = data.name;
        users[socket.name] = socket.id;

        //to store the room name and cap the number of people to MAX_USERS (2)
        socket.roomname = data.room;
        if (rooms[data.room] < MAX_USERS) { //if there is space in the room, then the user joins and the number of people increases to 1
            socket.roomName = data.room;
            socket.join(socket.roomName);
            rooms[socket.roomName]++;
        } else {
            socket.emit("maxUsersReached"); //if no space, then display message that MAX_USERS was reached
        }
        //console.log(rooms);
    })

    //To identify when an user disconnects
    socket.on("disconnect", () => {
        console.log("socket has been disconnected", socket.id); 
    })

    ////////////////////////////////////
    /// Leaves
    ////////////////////////////////////
    // add all open rooms
    if (leaves.length > 0) {
        let data = {
            leaves: leaves,
            rooms: rooms
        }
        socket.emit("prevLeaves", data);
    }

    socket.on('newLeaf', (data) => {
        // add leaf data to leaves
        console.log("this", data);
        leaves.push(data);
        io.sockets.emit('newLeaf', data);
        socket.emit('leafSuccess');
    })
    socket.on('hideRoom', (data) => {
        if (rooms[data.room]) {
            rooms[data.room]++;
        } else {
            rooms[data.room] = 1;
        }
        io.sockets.emit('hideRoom', data);
    })

    ////////////////////////////////////
    /// PACMAN
    ////////////////////////////////////

    //listen for a message named "directionData" from this client
    socket.on("directionData", (data) => {
        console.log(data); //NOTE: This data is perfectly being sent to the terminal. The problem with our program was to get to send it to all the users.
        //send the new directions (input of clicked keys) to all the servers
        socket.to(socket.roomname).emit("allDirData", data);

    });

    socket.on('playersData', (data) => {
        console.log("List of players", data);
        //send theinformation of all olayers to all the servers
        socket.to(socket.roomname).emit("allPlayersData", data);
    })
})


//server listening on port
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});