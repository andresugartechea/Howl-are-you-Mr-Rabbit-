class FallingObj {
    constructor(name, roomName, x, r, n) {
        this.loc = {
            x: x,
            y: 0
        }
        this.name = name;
        this.r = r; // image size
        this.g = window.innerHeight - window.innerHeight * 0.11; // end of screen
        this.speed = 0; // velocity this.step(prev name)
        this.n = 0; // stores array count of images so it can be easily accessible with sockets
        this.image = "/images/leaf" + (n) + ".png";
        // this is to save div elements inside the object so that it can be accessed easily
        this.div_cont = document.createElement('div');; // create div for leaf
        this.leaf = document.createElement('img'); // create image
        this.nameTag = document.createElement('p'); // create text tag
    }

    display = () => {

    }

    update = () => {

    }
}