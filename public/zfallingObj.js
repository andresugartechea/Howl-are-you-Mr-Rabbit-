class FallingObj {
    constructor(name, roomName, x, n, speedx) {
        this.loc = {
            x: x,
            y: 0
        }
        this.room = roomName;
        console.log(this.loc);
        this.name = name;
        this.g = window.innerHeight - window.innerHeight * 0.1; // end of screen +image height
        this.speed = {
            x: speedx,
            y: 0
        }; // velocity this.step(prev name)
        this.n = n; // stores array count of images so it can be easily accessible with sockets
        this.img = imgs[n]; //loadImage("./images/leaf" + (n) + ".png");
        console.log(imgs);
        this.img_h = window.innerHeight * 0.1;
        this.img_w = this.img_h; //this.img.width * (this.img_h / this.img.height);
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
                this.speed.x = 0
            } else {
                this.speed.y = 1;
                this.speed.x = this.temp;
            }
        }
        if (this.loc.x >= window.innerWidth - this.img_w) {
            this.speed.x *= -1;
        }
        this.loc.y += this.speed.y;
        this.loc.x += this.speed.x;
    }

    display = () => {
        this.update();
        image(this.img, this.loc.x, this.loc.y, this.img_w, this.img_h);
        this.changeCursor();
    }
    changeCursor = () => {
        if ((mouseX > this.loc.x && mouseX < this.loc.x + this.img_w) && (mouseY > this.loc.y && mouseY < this.loc.y + this.img_h)) {
            new p5.Element(this.img);
            cursor('pointer', mouseX, mouseY);
            this.onme = true;
            if (mouseIsPressed) {
                if (document.getElementById('username').value) {
                    // console.log(".", this.room, sessionStorage.getItem('player'), sessionStorage.getItem('name'));
                    if (!sessionStorage.getItem('player')) {
                        sessionStorage.setItem('player', "2");
                        sessionStorage.setItem('room', this.room);
                        window.location = './pacman.html';
                    } else {
                        window.location = './pacman.html';
                    }

                } else {
                    //add pop up
                }
            }
        } else {
            this.onme = false;
        }
    }
    movePakman = () => {
        window.location = './pacman.html';
    }
}

/*
(1) restore room at disconnect
(2) remove leaf at disconnect

*/