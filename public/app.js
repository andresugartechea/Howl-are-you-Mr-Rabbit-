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


//for grid class
let gameGrid;
let rows = 30
let cols = 30;
let size;

//for both players
let direction;
let score;
let pacman;
let ghost;
//for the delay
let time;
let wait = 300;

//for images
let bg;

//game states
let gameState = "start";



//Display P5 Canva
function setup(){

    background(0);
    bg = loadImage("/images/background.png")

    canvas = createCanvas(600,600);
    canvas.position(windowWidth/3.5, windowHeight/10);
    canvas.style('z-index', '-1');
    
    score = 0;
    size = width/rows;

    gameGrid = new Grid(size,rows,cols); //create a new Grid object

    pacman = new Player(14*size, 22*size, size);
    ghost = new Player(14*size, 14*size, size);

    time = millis();

}


function draw() {

    if (gameState == "start"){

        background(bg);
        gameGrid.draw(); //draw the grid

        
        if(millis() - time >= wait){
            pacman.move();

            ghost.move();
            //update the stored time
            time = millis();
        }


        ghost.display();
        pacman.display();

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
        } else if (currGrid ==4){ //if power token
            gameGrid.update(cellNum);
        }

        //checkWalls();

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
  
