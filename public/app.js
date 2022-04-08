//opens and connects to the socket
let socket = io();

//value assigned with user's input
// // // let msg_text;
window.addEventListener("load", function(){

    //listen for confirmation
    socket.on("connect", () => {
        console.log("Connected to the server via sockets")
    })

    // // // //we get the input from the user
    // // // let msg_input = this.document.getElementById("input-msg");

    // // // //we listen to 'Send' button
    // // // let submitButton = document.getElementById('submit-button');
    // // // submitButton.addEventListener('click', function () {
    // // //     msg_text = msg_input.value;
    // // //     //console.log(msg_text);
    // // // });

})

// // // //to resixe window every time there's a change
// // // function windowResized(){
// // //     resizeCanvas(windowWidth, windowHeight);
// // // }


// // //to get the coordinates and input of each text drawn by all the users
// // let drawingCoords={};
// // socket.on('dataFromServer', (data)=> {
// //     drawingCoords = data;
// // })

let rows = 30
let cols = 30;
let size;
let score;

//for players
let direction;
let pacman;
let pacstart_x;
let pacstart_y;
let prev_x;
let prev_y;

//for Grid

//Display P5 Canva
function setup(){
    background(0);
    frameRate(4);
    canvas = createCanvas(600,600);
    canvas.position(windowWidth/3.5, windowHeight/10);
    canvas.style('z-index', '-1');
    score = 0;

    size = width/rows;

    gameGrid = new Grid(size,rows,cols); //create a new Grid object

    pacman = new Player(14*size, 22*size, size, size);

    //console.log(wallCoordinates);

}


function draw() {
    background(220);

    gameGrid.grid[0] = "0";
    gameGrid.draw(); //draw the grid
    pacman.display();//draw pacman
    pacman.move();
    
    currGrid = gameGrid.getCurrValue(pacman.x, pacman.y)// //check pacman position with respect to the grid
    cellNum = gameGrid.getCurrCell(pacman.x, pacman.y)// gives index

    //console.log(currGrid)
    // depending on the underlying grid value change the colour of the ellipse

    if(currGrid==1) { //if coin
        score++;

    } else if (currGrid==2){ //if wall
    //   pacman.x -=
    //   y = pacman.y; 
    // } else {    //empty cell
    //   fill(0,0,255);
    // }
    }

    checkWalls();

    //console.log(pacman.x)
  }


function checkWalls(){
    if (pacman.x==-size){
        pacman.x = width;
    } else if (pacman.x>=width){
        pacman.x = -size;
    } else if ((direction == 1)&&(currGrid == 2)){ //RIGHT
        prev_x = pacman.x-size;
        pacman.x = prev_x;
    } else if ((direction == 3)&&(currGrid == 2)){ //LEFT
        prev_x = pacman.x+size;
        pacman.x = prev_x;
    } else if ((direction == 2)&&(currGrid == 2)){ //UP
        prev_y = pacman.y+size;
        pacman.y = prev_y;
    } else if ((direction == 4)&&(currGrid == 2)){ //UP
        prev_y = pacman.y-size;
        pacman.y = prev_y;
    } 
}


function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        direction = 1;
    } else if (keyCode === UP_ARROW) {
        direction = 2;
    } else if (keyCode === LEFT_ARROW) {
        direction = 3;
    } else if (keyCode === DOWN_ARROW) {
        direction = 4;

    }

//     // // //     socket.emit("msgPositionData", msgPost)
}
  
