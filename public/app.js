//CLIENT side

//opens and connects to the socket
let socket = io();

//for html information
let coin_html;
let player_html;

//game states
let gameState;
let userData;

//to count players on website
playerList = [];

//Waits for page to load
window.addEventListener("load", function() {

    coin_html = document.getElementById("information_role");
    player_html = document.getElementById("information_coins");

    gameState = "instructions";

    //waits for socket to connect
    socket.on("connect", () => {
        console.log("Connected to the server via sockets");

        userData = {
            'name': sessionStorage.getItem('name'),
            'room': sessionStorage.getItem('room'),
            'player': this.sessionStorage.getItem('player')
        }
        console.log(userData);
        socket.emit('userData', userData);

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
    instructions_img = loadImage("/images/instructions.png")
    bunny_wins_img = loadImage("/images/bunny_wins.png")
    wolf_wins_img = loadImage("/images/wolf_wins.png")


    canvas = createCanvas(600, 600);
    //canvas.position(windowWidth/3.5, windowHeight/10);
    canvas.style('z-index', '-1');

    score = 0;
    size = width / rows;

    gameGrid = new Grid(size, rows, cols); //create a new Grid object

    pacman = new Player(14 * size, 22 * size, size, "/images/bunny.png");
    ghost = new Player2(14 * size, 14 * size, size, "/images/wolf.png");

    time = millis();

    // //to get the directions (input of KEY ARROWS) from both users
    socket.on('allDirData', (data) => {
        console.log(data);
        //drawPos(obj);
    });

    socket.on("allPlayersData", (data) => {
        roles = data;
    })

}

function draw() {

    if (gameState == "start") {
        //console.log(roles);

        background(bg);
        background(255, 255, 0, 100)
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
            wait -= 15;
            gameGrid.update(cellNum);
        }
        // } else if (currGrid == 4) { //if power token
        //     gameGrid.update(cellNum);
        // }

        currGrid_2 = gameGrid.getCurrValue(ghost.x, ghost.y) // //check pacman position with respect to the grid
        cellNum_2 = gameGrid.getCurrCell(ghost.x, ghost.y) // gives index
            //depending on the underlying grid value change the colour of the ellipse
        if (currGrid_2 == 1) { //if coin
            score++;
            gameGrid.update2(cellNum_2);
        } else if (currGrid_2 == 3) { //if wall
            wait -= 10;
            gameGrid.update2(cellNum_2);
        } else if (currGrid == 4) { //if power token
            gameGrid.update2(cellNum_2);
        }

        if (score == gameGrid.toWin) {
            gameState = "win";
        }
        if ((pacman.x == ghost.x) && (pacman.y == ghost.y)) {
            gameState = "lose";
        }

        //Information displayed on html
        coin_html.innerHTML = "apples left: " + str(gameGrid.toWin - score);
        player_html.innerHTML = "";

    }

    //other gameStates
    if (gameState == "instructions") {
        image(instructions_img, 0, 0, width, height); 
        fill(255);
        textSize(20)
        text("KEY ARROWS TO MOVE", 139, 266)
        fill(204, 255, 204);
        textSize(15);
        text("Wolf, touching the apples will make them inedible.", 33, 400, 240, 240);
        text("Don't touch too many apples or your prey will run away!", 33, 470, 240, 240);
        text("Bunny, it's time for lunch! Eat all the apples before the Wolf arrives.", 394, 314, 220, 240);
        text("Your favorite! Eat a carrot to gain some speed.", 394, 446, 220, 240);
        fill(255);
        text("Press any key to continue", 139, 577)
    } else if (gameState == "win") {
        background(255);
        image(bunny_wins_img, 0, 0, width, height);
        fill(0);
        textSize(90)
        text("BUNNY", 24, 143)
        text("WINS", 24, 233)
        coin_html.innerHTML = "GAME OVER";
        //console.log(mouseX, mouseY);
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
    if (gameState == "start"){
        if (keyCode === RIGHT_ARROW) {
            direction = 1;
        } else if (keyCode === UP_ARROW) {
            direction = 2;
        } else if (keyCode === LEFT_ARROW) {
            direction = 3;
        } else if (keyCode === DOWN_ARROW) {
            direction = 4;
        }
    
        if (key === 'd') {
            direction_pl2 = 1;
        } else if (key === "w") {
            direction_pl2 = 2;
        } else if (key === "a") {
            direction_pl2 = 3;
        } else if (key === "s") {
            direction_pl2 = 4;
        }
    
    
        //Grab direction
        let newLocation = { 
            player1: {
                new_x: pacman.x,
                new_y: pacman.y,
            },
            player2: {
                new_x: ghost.x,
                new_y: ghost.y,
            },
        };
    
        console.log(newLocation);
        socket.emit("directionData", newLocation);
    } 
    if (gameState == "instructions"){
        if (key === " "){
            gameState = "start";
        }
    }

}