//CLIENT side

//opens and connects to the socket
let socket = io();

//for html information
let coin_html;
let player_html;

//game states
let gameState;

//to count players on website
playerList = [];
let userData;

//Waits for page to load
window.addEventListener("load", function() {

    //for the html
    coin_html = document.getElementById("information_role"); //here, I displayed the information about the apples that the bunny needs to eat to win
    player_html = document.getElementById("information_coins"); //here, I send the infomation about the user (this is something that I couldn't implement, since my room was not receiving from the server the data)

    //the game starts displaying the instructions
    gameState = "instructions";

    //connecting with sockets
    socket.on("connect", () => {
        console.log("Connected to the server via sockets"); //to confirm connection on console

        //after connection, the user receives the data about the other user's input (the coordinates of their characters). (Same note: the data didn't fetch correctly and I couldn't communicate it to all the users)
        socket.on('allDirData', function(obj) {
            direction = obj.pl1_dir;
            direction_pl2 = obj.pl2_dir;
        });

        //this sends data about the username and the room chosen on the landing page. For some reason this would also be sent after refreshing the game page, but not right after joining the room.
        userData = {
            'name': sessionStorage.getItem('name'),
            'room': sessionStorage.getItem('room'),
            'player': this.sessionStorage.getItem('player')
        }
        //console.log(userData); to test if we were receiving the data correctly (which was not the case)
        socket.emit('userData', userData);

        //to create a list of player with their socket.id's
        plhrData = {
            'player': socket.id
        }
        playerList.push(plhrData);
        socket.emit('playersData', plhrData);

    })
})


//for grid class
let gameGrid;
let rows = 30;
let cols = 30;
let size;

//for both players
let direction;
let direction_pl2;
let pacman;
let ghost;
let score;
let coordinates = {};

//for the delay
let time;
let wait = 300;

//for images
let bg;
let instructions_img;
let carrot_img;
let apple_img;
let tree_img;
let bunny_img;
let wolf_img;
let bunny_wins_img;
let wolf_wins_img;

//to assign roles
let roles;

//for the fonts
let gameFont;

//Display P5 Canva
function setup() {

    background(0);

    //for font
    gameFont = loadFont("fonts/superMarioFont.ttf");
    textFont(gameFont);

    //for images;
    bg = loadImage("/images/background_2.png")
    instructions_img = loadImage("/images/instructions_2.png")
    bunny_wins_img = loadImage("/images/bunny_wins.png")
    wolf_wins_img = loadImage("/images/wolf_wins.png")

    //to create and position canvas on page
    canvas = createCanvas(600, 600);
    canvas.style('z-index', '-1');

    //other variables
    score = 0;
    size = width / rows;
    time = millis();

    //Objects to initialize the game
    gameGrid = new Grid(size, rows, cols);
    pacman = new Player(14 * size, 22 * size, size, "/images/bunny.png");
    ghost = new Player2(14 * size, 14 * size, size, "/images/wolf.png");

    socket.on("allPlayersData", (data) => {
        roles = data;
    })

    /////This part was supposed to update the coordinates of wolf and bunny on both screens. It is commented out because otherwise the players move.
    // //to get the directions (input of KEY ARROWS) from both users
    // socket.on('allDirData', (data) => {
    //     coordinates = data;
    // });

}

function draw() {

    if (gameState == "start") {

        /////Same note: This part was supposed to update the coordinates of wolf and bunny on both screens. It is commented out because otherwise the players move.
        // direction = coordinates.pl1_dir;
        // direction_pl2 = coordinates.pl2_dir;

        background(bg);
        background(255, 255, 0, 100)

        gameGrid.draw(); //we start drawing the grid on screen

        //To increment game speed when pacman/bunny eats carrots
        if (millis() - time >= wait) {
            pacman.move();
            ghost.move();
            time = millis(); //update the stored time
        }

        //Display both characters after game speed is updated
        ghost.display();
        pacman.display();

        //To change items in grid depending on pacman/bunny's position
        currGrid = gameGrid.getCurrValue(pacman.x, pacman.y) //check value of grid (0-4) according to pacman/bunny's position
        cellNum = gameGrid.getCurrCell(pacman.x, pacman.y) //gives index based on pacman/bunny's position
        
        if (currGrid == 1) { // if apple
            score++;
            gameGrid.update(cellNum); //updates for an empty cell
        } else if (currGrid == 3) { // if carrot
            wait -= 15;
            gameGrid.update(cellNum);
        }

        //To change items in grid depending on ghost/wolf's position
        currGrid_2 = gameGrid.getCurrValue(ghost.x, ghost.y)
        cellNum_2 = gameGrid.getCurrCell(ghost.x, ghost.y)
        if (currGrid_2 == 1) { //if apple
            score++;           //it also increases the score, since the goal of the wolf is to eat the bunny with the fewest moves 
            gameGrid.update2(cellNum_2);
        } else if (currGrid_2 == 3) { //if carrot
            wait -= 10;
            gameGrid.update2(cellNum_2);
        } 

        //When bunny eats all the apples
        if (score == gameGrid.toWin) {
            gameState = "win"; //bunny wins
        }

        //When wolf eats bunny
        if ((pacman.x == ghost.x) && (pacman.y == ghost.y)) {
            gameState = "lose"; //wolf wins
        }

        //Information displayed on html
        coin_html.innerHTML = "apples left: " + str(gameGrid.toWin - score);
        player_html.innerHTML = ""; //the information about the user was supposed to be displayed here, but it didn't fetch correctly


        /////As an attempt to get the live coordinates of wolf and bunny, we used this. Commented out in case it's useful to debug our project in the future.
        // //Grab direction
        // let newLocation = { 
        //     player1: {
        //         new_x: pacman.x,
        //         new_y: pacman.y,
        //     },
        //     player2: {
        //         new_x: ghost.x,
        //         new_y: ghost.y,
        //     },
        // };
        // //console.log(newLocation);
        // socket.emit("directionData", newLocation);

    }

    //other gameStates
    if (gameState == "instructions") {
        image(instructions_img, 0, 0, width, height);
        fill(255);
        textSize(20)
        textAlign(CENTER);
        text("PRESS SPACEBAR TO CONTINUE", 215, 60, 200, 400)

        fill(0);
        textAlign(LEFT);
        text("A", 134, 235)
        text("S", 190, 235)
        text("D", 241, 235)
        text("W", 188, 182)

        fill(204, 255, 204);
        textSize(15);
        text("Wolf, touching the apples will make them inedible.", 33, 400, 240, 240);
        text("Don't touch too many apples or your prey will run away!", 33, 470, 240, 240);
        text("Bunny, it's time for lunch! Eat all the apples before the Wolf arrives.", 394, 314, 220, 240);
        text("Your favorite! Eat a carrot to gain some speed.", 394, 446, 220, 240);
        fill(255);

    } else if (gameState == "win") {
        background(255);
        image(bunny_wins_img, 0, 0, width, height);
        fill(0);
        textSize(90)
        text("BUNNY", 24, 143)
        text("WINS", 24, 233)
        coin_html.innerHTML = "GAME OVER";

    } else if (gameState == "lose") {
        background(255, 0, 0);
        fill(0);
        textSize(90)
        image(wolf_wins_img, 0, 0, width, height);
        text("WOLF", 24, 143)
        text("WINS", 24, 233)
        coin_html.innerHTML = "GAME OVER";
    }
}

function keyPressed() {
    if (gameState == "start") {
        if (keyCode === RIGHT_ARROW) {
            direction = 1;
        } else if (keyCode === UP_ARROW) {
            direction = 2;
        } else if (keyCode === LEFT_ARROW) {
            direction = 3;
        } else if (keyCode === DOWN_ARROW) {
            direction = 4;
        }

        if ((key === 'd') || (key === 'D')) {
            direction_pl2 = 1;
        } else if ((key === "w") || (key === 'W')) {
            direction_pl2 = 2;
        } else if ((key === "a") || (key === 'A')) {
            direction_pl2 = 3;
        } else if ((key === "s") || (key === 'S')) {
            direction_pl2 = 4;
        }

        //Grab direction
        let newDirection = {
            pl1_dir: direction,
            pl2_dir: direction_pl2
        };
        socket.emit("directionData", newDirection);

    }
    if (gameState == "instructions") {
        if (key === " ") {
            gameState = "start";
        }
    }

}

//////Another method that we tried to display characters on both screens, based on example seen in class.
// function changeDirection(obj){
//     direction = obj.pl1_dir;
//     direction_pl2 = obj.pl2_dir;
//     console.log(obj.pl1_dir)
// }