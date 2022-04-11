class FallingObj {
    constructor(name, roomName, x, n, speedx) {
        this.loc = {
            x: x,
            y: 0
        }
        console.log(this.loc);
        this.name = name;
        this.g = window.innerHeight - window.innerHeight * 0.1; // end of screen +image height
        this.speed = {
            x: speedx,
            y: 0
        }; // velocity this.step(prev name)
        this.n = n; // stores array count of images so it can be easily accessible with sockets
        this.img = loadImage("./images/leaf" + (n + 1) + ".png");
        this.img_h = window.innerHeight * 0.1;
        this.img_w = this.img.width * (this.img_h / this.img.height);
        // this is to save div elements inside the object so that it can be accessed easily
        this.div_cont = document.createElement('div');; // create div for leaf
        this.leaf = document.createElement('img'); // create image
        this.nameTag = document.createElement('p'); // create text tag
        this.onme = false;
        this.temp = this.speed.x;
    }

    update = () => {
        if (this.loc.y >= this.g) {
            this.speed.y = 0;
            this.loc.y = this.g;
            this.speed.x = 0;
        } else {
            if (this.onme) {
                this.speed.y = 0;
                this.temp = this.speed.x;
                this.speed.x = 0
            } else {
                this.speed.y = 1;
                this.speed.x = this.temp;
            }
        }
        if (this.loc.x <= this.img_w || this.loc.x >= window.innerWidth - this.img_w) {
            this.speed.x *= -1;
        }
        this.loc.y += this.speed.y;
        this.loc.x += this.speed.x;
    }

    display = () => {
        this.update();
        this.changeCursor();
        image(this.img, this.loc.x, this.loc.y, this.img_w, this.img_h);
    }
    changeCursor = () => {
        if ((mouseX > this.loc.x && mouseX < this.loc.x + this.img_w) && (mouseY > this.loc.y && mouseY < this.loc.y + this.img_h)) {
            cursor(CROSS, mouseX, mouseY);
            console.log('bla', mouseX, mouseY);
            this.onme = true;
            if (mouseIsPressed) {
                window.location = './pacman.html';
            }
        } else {
            this.onme = false;
        }
    }
}

/*
(1) check cropping image on processing for background image resizing
(2) finish p5 set up functions and create obj array+obj
(3) test motion of leaves here
(4) add sockets at commented areas
(5) add mouse functions and click functions
(6) add rooms and save data to session storage and join selected room
*/