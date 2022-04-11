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


// let allMessages = [];

//when a socket connects, take the socket callback, and display the id in the server
io.sockets.on("connection", (socket) => {
    console.log("we have a new client: ", socket.id);

    //drop a message on the server when the socket disconnects
    socket.on("disconnect", () => {
        console.log("client has been disconnected" , socket.id);
    })

    //listen for a message named "directionData" from this client

    socket.on("directionData", (data) =>{
        console.log("Received new direction", data);

        //send the new directions to all the servers
        io.sockets.emit("allDirData", data);

    });
 
})


//server listening on port
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});
