let width = window.innerWidth;
let height = window.innerHeight;

// bg image
let bg;
let myCanvas;
let imgs = [];
let imgsWidth = [];

function preload() {
    for (let i = 0; i < 4; i++) {
        imgs.push(loadImage("./images/leaf" + (i) + ".png"));
        imgsWidth.push(imgs[i].width);
    }
}


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
    for (let i = 0; i < leavesObj.length; i++) {
        leavesObj[i].display();
    }

}

function mouseClicked(event) {

}