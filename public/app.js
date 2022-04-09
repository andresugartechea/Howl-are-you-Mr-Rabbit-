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

//for player 1
let direction;
let pacman;
let pacstart_x;
let pacstart_y;
let prev_x;
let prev_y;

//for player 2
let ghost;

//for Grid
let gameGrid;

//for images
let bg;

//game states
let gameState = "start";

//for the delay
let time;
let wait = 300;

//Display P5 Canva
function setup(){

    //frameRate(3);
    background(0);
    bg = loadImage("/images/background.png")

    canvas = createCanvas(600,600);
    canvas.position(windowWidth/3.5, windowHeight/10);
    canvas.style('z-index', '-1');
    score = 0;

    size = width/rows;
    gameGrid = new Grid(size,rows,cols); //create a new Grid object
    pacman = new Player(14*size, 22*size, size, size);
    ghost = new Player(14*size, 14*size, size, size);


    time = millis();
    //console.log(wallCoordinates);

}


function draw() {

    if (gameState == "start"){
        background(bg);
        gameGrid.draw(); //draw the grid
        //pacman.display();//draw pacman

        if(millis() - time >= wait){
            //pacman.move();
            ghost.move();
            //update the stored time
            time = millis();
        }

        ghost.display();

        
        currGrid = gameGrid.getCurrValue(pacman.x, pacman.y)// //check pacman position with respect to the grid
        cellNum = gameGrid.getCurrCell(pacman.x, pacman.y)// gives index

        //console.log(currGrid)
        // depending on the underlying grid value change the colour of the ellipse

        if(currGrid==1) { //if coin
            score++;
            gameGrid.update(cellNum);
        } else if (currGrid==3){ //if wall
            wait -=10;
            gameGrid.update(cellNum);
        } else if (currGrid ==4){
            gameGrid.update(cellNum);
        }

        checkWalls();

        //console.log(score);

        if (score==gameGrid.toWin){
            gameState = "win";
        }
        if((pacman.x==ghost.x)&&(pacman.y==ghost.y)){
            gameState = "lose";
        }
    }

    if (gameState == "win"){
        background(255);
    } else if (gameState == "lose"){
        background(255,0,0);
    }
  }


function checkWalls(){
    if (pacman.x==-size){
        pacman.x = width;
    } else if (pacman.x>=width){
        pacman.x =-size;
    } else if (pacman.y <0){
        pacman.y = height;
    } else if (pacman.y>=height){
        pacman.y = 0;
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
  
