class FallingObj {
    constructor(name, roomName, x, n) {
        this.loc = {
            x: x,
            y: 0
        }
        this.name = name;
        this.g = window.innerHeight - window.innerHeight * 0.1; // end of screen +image height
        this.speed = {
            x: random(-3, 3),
            y: 0
        }; // velocity this.step(prev name)
        this.n = n; // stores array count of images so it can be easily accessible with sockets
        this.img = loadImage("/images/leaf" + (n) + ".png");
        this.img_h = window.innerHeight * 0.1;
        this.img_w = this.img.width * (this.img_h / this.img.height);
        // this is to save div elements inside the object so that it can be accessed easily
        this.div_cont = document.createElement('div');; // create div for leaf
        this.leaf = document.createElement('img'); // create image
        this.nameTag = document.createElement('p'); // create text tag
    }

    update = () => {
        if (this.loc.y >= this.g) {
            this.speed.y = 0;
            this.loc.y = this.loc.g;
        } else {
            this.speed.y = 3;
        }
        this.loc.y += this.speed.y;
        this.loc.x += this.speed.x;
    }

    display = () => {
        this.update(); // socket.on('leafupdate', n) will call this and pass n(aka array index) as argument to edit n

        image(this.image, this.loc.x, this.loc.y, this.img_w, this.img_h);
    }
}

/*
image(self.img, self.x - self.img_w//2 - game.x_shift, self.y - self.img_h//2, self.img_w, self.img_h, (self.frame + 1) * self.img_w, 0, self.frame * self.img_w, self.img_h)   


(1) check cropping image on processing for background image resizing
(2) finish p5 set up functions and create obj array+obj
(3) test motion of leaves here
(4) add sockets at commented areas
(5) add mouse functions and click functions
(6) add rooms and save data to session storage and join selected room

*/