let socket = io();

let width = window.innerWidth;
let height = window.innerHeight;

// bg image
let bg;

let leaves = [];


function setup() {
    //Set the parent of the canvas to an exisitng html element's id value 
    const myCanvas = createCanvas(width, height);
    myCanvas.parent("sketch");
    bg = loadImage('images/background.png');
}

function draw() {
    background(bg);
}