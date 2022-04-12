//THIS PART IS TAKEN FROM MY CLASS NOTES: https://github.com/MathuraMG/ConnectionsLabSpring22/tree/master/Week_8_Sockets

const { randomBytes } = require("crypto");
let express = require("express");
const { all } = require("express/lib/application");
let app = express();
app.use('/', express.static("public"));

//To start HTTP server
let http = require("http");
let server = http.createServer(app); //
let port = process.env.PORT || 8000;

//To start connection with socket.io
let io = require("socket.io");
io = new io.Server(server);


//To limit the amount of people in each room
const MAX_USERS = 2;
// to store prev leaves
let leaves = [];
let rooms = {}; // key value pair - 'roomname' : number of people in room
let users = {}; // key value pair - 'username' : userid

//when a socket connects, take the socket callback, and display the id in the server
io.sockets.on("connection", (socket) => {
    console.log("we have a new client: ", socket.id);

    //get user data
    socket.on("userData", (data) => {
        //save username in an array
        socket.name = data.name;
        users[socket.name] = socket.id;


        //to limit the number of people in each room 
        if (rooms[data.room] < MAX_USERS) {
            socket.roomName = data.room; // we will add this data to the socket only after we can verify that there is space
            socket.join(socket.roomName);
            rooms[socket.roomName]++;
        } else {
            socket.emit("maxUsersReached");
        }

        console.log(rooms);

        // // to limit the number of people in a room
        // if(rooms[data.room]) { //if the room exists 
        //     if(rooms[data.room]< MAX_USERS_ROOM) {
        //         //let the socket join room of choice
        //         socket.roomName = data.room; // we will add this data to the socket only after we can verify that there is space
        //         socket.join(socket.roomName);
        //         rooms[socket.roomName]++;
        //     } else {
        //         socket.emit('maxUsersReached');
        //     }
        // } else {
        //     socket.roomName = data.room;
        //     socket.join(socket.roomName);
        //     rooms[socket.roomName]=1;   
        // }

        // console.log(rooms);
    })

    //////

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
        let data = {
            leaves: leaves,
            rooms: rooms
        }
        socket.emit("prevLeaves", data);
    }

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
        if (rooms["room" + data.c]) {
            rooms["room" + data.c]++;
        } else {
            rooms["room" + data.c] = 0;
        }
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

    socket.on('playersData', (data) => {
        console.log("List of players", data);

        //send the new directions to all the servers
        io.sockets.emit("allPlayersData", data);
    })
})


//server listening on port
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});