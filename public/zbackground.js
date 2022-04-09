let socket = io();

let width = window.innerWidth;
let height = window.innerHeight;

// bg image
let bg;
let myCanvas;

// create leaves array to randomly assign leaf objects 
let leaves = [];

function setup() {
    //Set the parent of the canvas to an exisitng html element's id value 
    myCanvas = createCanvas(width, height);
    myCanvas.parent("sketch");
    bg = loadImage('images/background.png');
    background(bg);
}

function draw() {
    myCanvas = resizeCanvas(window.innerWidth, window.innerHeight)
    background(bg);

}