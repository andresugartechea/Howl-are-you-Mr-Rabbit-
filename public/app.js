//CLIENT side

//opens and connects to the socket
let socket = io();

//for html information
let coin_html;
let player_html;

//game states
let gameState;

//Waits for page to load
window.addEventListener("load", function() {

    coin_html = document.getElementById("information_role");
    player_html = document.getElementById("information_coins");

    gameState = "start";

    //waits for socket to connect
    socket.on("connect", () => {
        console.log("Connected to the server via sockets");

        let data = {
            'name': sessionStorage.getItem('name'),
            'room': sessionStorage.getItem('room')
        }
        console.log(data);
        //socket.emit('userData', data);
    })
})


//to resixe window every time there's a change
// function windowResized(){
//      resizeCanvas(windowWidth, windowHeight);
// }


//for grid class
let gameGrid;
let rows = 30;
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
let carrot_img;



//Display P5 Canva
function setup() {

    background(0);

    //for images;
    bg = loadImage("/images/background_2.png")


    canvas = createCanvas(600, 600);
    //canvas.position(windowWidth/3.5, windowHeight/10);
    canvas.style('z-index', '-1');

    score = 0;
    size = width / rows;

    gameGrid = new Grid(size, rows, cols); //create a new Grid object

    pacman = new Player(14 * size, 22 * size, size);
    ghost = new Player(14 * size, 14 * size, size);

    time = millis();

    // //to get the directions (input of KEY ARROWS) from both users
    socket.on('allDirData', (data) => {
        direction = data.direction;
        //drawPos(obj);
    });

}


function draw() {

    if (gameState == "start") {

        background(bg);
        gameGrid.draw(); //draw the grid


        if (millis() - time >= wait) {
            pacman.move();

            ghost.move();
            time = millis(); //update the stored time
        }


        ghost.display();
        pacman.display();

        currGrid = gameGrid.getCurrValue(pacman.x, pacman.y) // //check pacman position with respect to the grid
        cellNum = gameGrid.getCurrCell(pacman.x, pacman.y) // gives index

        //depending on the underlying grid value change the colour of the ellipse
        if (currGrid == 1) { //if coin
            score++;
            gameGrid.update(cellNum);
        } else if (currGrid == 3) { //if wall
            wait -= 10;
            gameGrid.update(cellNum);
        } else if (currGrid == 4) { //if power token
            gameGrid.update(cellNum);
        }


        if (score == gameGrid.toWin) {
            gameState = "win";
        }
        if ((pacman.x == ghost.x) && (pacman.y == ghost.y)) {
            gameState = "lose";
        }

        //Information displayed on html
        coin_html.innerHTML = "your role: holip ";
        player_html.innerHTML = "coins: " + str(gameGrid.toWin - score);


        //image(carrot_img,0,0,20,20)
    }

    if (gameState == "win") {
        background(255);
    } else if (gameState == "lose") {
        background(255, 0, 0);
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

    //Grab direction
    let newDirection = { direction: direction };

    console.log(newDirection);
    socket.emit("directionData", newDirection);

}