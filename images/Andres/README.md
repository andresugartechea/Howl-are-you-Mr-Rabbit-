# Howl Are You, Mr. Rabbirt? | Andres' documentation

## I | Process:

### A - First drafts and evolution of the concept: 

My first draft idea was to develop my own version of Skribbl, which is an online game that my friends and I find very entertaining. Nonetheless, I considered that this idea wouldn’t allow me to push my creative and coding skills the way I wanted. For this reason, I decided to move to my second idea, which is to recreate the game of tag on a virtual platform. The game would consist of a player chasing another one by moving the key arrows, having features like the ability to increase the speed and eating items to gain points. This new concept seemed similar to the Pacman videogame, so I found it interesting to try to combine its aesthetics with the concept of my game. 

<img src="firstconcept_1.png" width ="500" /> 

In the beginning, I was working on my own but I started collaborating with Fatema Nassar when we realized that our creative concepts could go along very well. Her animations of leaves falling down gave the forest theme of this game and gave birth to “Howl Are You Mr. Rabbirt?”. 

<img src="bunny.png" width ="100" /> <img src="wolf.jpg" width ="100" /> 

In our unified version, the role of Pacman is represented by a bunny and the ghost by a wolf.

### B - Wireframe and followed steps:

For my part of the project, which is the second page showing the videogame, I followed this wireframe:

<img src="wireframe.png" height ="700" /> 

The concept for this page, as a mention before, was to give a Pacman-inspired atmosphere to the videogame that homogenizes with the landing page. After testing different designs, this is the one that my partner and I decided to keep:

<img src="wireframe1.png" height ="700" /> 

Before starting coding, I followed my professor’s advice and wrote down all the steps I would need to follow for this project. There was some obstacles that I encountered in the process, but this method allowed me to know in what direction my part of the project was going. At the end, I couldn’t respect all the points from the list, but I kept those that were essential for the user’s experience and I think it’s something that motivates me to keep working in this project in the future.

<img src="firstconcept_2.png" width ="500" /> 

## Major problems and solutions: 

Academically speaking, my goal with this project was to push myself out of my comfort zone and code something that I usually struggle with, which is a videogame. I knew this would be challenging, so I list here the main issues I faced and how I overcame them:

1. I encountered multiple challenges in this project that pushed me to gain more coding skills and reinforced the ones I learned in class. For instance, in the first version of my work I had used a lot of iterations (_‘for’_ loops) and this was inefficient for collision detection. In this regard, my professor recommended me to use [her example of a Grid class](https://editor.p5js.org/itp42/sketches/dBeLZC8mm) that she had previously coded. Studying her code unblocked a logic that I hadn’t used before in my previous assignments.
  A function that I learned from this Grid example was ‘floor()’. This is similar to ‘map()’ and gives the closest integer that is smaller or equal to the parameter.

```
    //this gives the value of the cell where the player is
    getCurrValue(x, y) {
        let gridX = floor(x / this.size);
        let gridY = floor(y / this.size);
       // print(gridX, gridY); 
        return this.grid[gridY* this.cols + gridX];
    }
```

2. After restarting my project basing it on my professor’s code, the next challenge that I encountered was to apply inheritance in my classes. This is something I had struggled with in the past when I coded for the first time in Python. Thanks to [the Coding Train’s tutorial on Javascript](https://www.youtube.com/watch?v=MfxBfRD0FVU), I could apply this fundamental concept of programming in my videogame and saved some lines of code. Here is an example of how I applied this concept in my code:

```
class Player2 extends Player {
    constructor(x, y, size, image_name) {
        super(x, y, size, image_name);
        this.image = loadImage(image_name)

        this.pl_x = x;
        this.pl_y = y;
    }
```
  Player one and two (wolf and bunny) have similar behavior but are controlled by different keys. In this example, applying inheritance saved me some time and a lot of lines of code.
  
3. Furthermore, another challenge that I encountered was to combine Fatema Nassar’s part with mine, which took us some time to figure out. The part of my project that creates the connection with sockets is the following one:

```
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

```
Unfortunately, as mentioned on the code comments, we were not able to send the data from one user to another. The interesting thing we noticed was that the data would only appear on the console after refreshing the page, but not right after the user joins the room as we wanted. In addition, by testing in a different browser (Mozilla Firefox) we got the information of the user and the name of the room displayed on the console, but we didn’t get to see the coordinates of the players.

## Final result: 

[You can see how our website looks like here](https://howl-are-you-mr-rabbit.glitch.me/)


