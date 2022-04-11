//THIS PART IS TAKEN FROM MY CLASS NOTES: https://github.com/MathuraMG/ConnectionsLabSpring22/tree/master/Week_8_Sockets

//SERVER side 

//To start the server
let express = require("express"); //initialize express 'app' object
let app = express();
app.use('/', express.static("public"));
const { all } = require("express/lib/application");

//To start HTTP server
let http = require("http");
let server = http.createServer(app);//
let port = process.env.PORT || 8000;

//To start connection with socket.io
let io = require("socket.io");
io = new io.Server(server);

<<<<<<< HEAD
//To limit the amount of people in each room
const MAX_USERS =  2;


=======
app.use('/', express.static("public"));

// leaves
let leaves = [];

let allMessages = [];
>>>>>>> a3747f0e2c1a0091d4f5eb76c6415f3a82e63afa
//when a socket connects, take the socket callback, and display the id in the server
io.sockets.on("connection", (socket) => {
    console.log("we have a new client: ", socket.id);




    //drop a message on the server when the socket disconnects
    socket.on("disconnect", () => {
        console.log("client has been disconnected" , socket.id);
    })


<<<<<<< HEAD

    //listen for a message named "directionData" from this client
    socket.on("directionData", (data) =>{
        console.log("Received new direction", data);

        //send the new directions to all the servers
        io.sockets.emit("allDirData", data);

    });
 
=======
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
>>>>>>> a3747f0e2c1a0091d4f5eb76c6415f3a82e63afa
})


//server listening on port
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});
