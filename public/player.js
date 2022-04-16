class Player extends Grid{
    constructor(x, y, size, image_name){
        super(size, rows, cols);
        this.x = x;
        this.y = y;
        this.s = size;
        this.xspeed = this.s;
        this.yspeed = this.s;

        //for collision detection
        this.currPos;
        //for images
        this.image = loadImage(image_name)
    }

    move(){
        //directions controlled with keys
        if (direction == 1){
            this.x += this.xspeed;
        }
        else if (direction == 2){
            this.y -= this.yspeed;
        }
        else if (direction == 3){
            this.x -= this.xspeed;
        }
        else if (direction == 4){
            this.y += this.yspeed;
        }
    }

    checkWall(){

        //Checks current position to use it for collision detection
        this.currPos = this.getCurrValue(this.x, this.y);

        if (this.x==-this.s){ //left path, bunny goes back in the map from the right
            this.x = width-this.s;
        } else if (this.x>=width) { //right path, bunny goes back in the map from the left
            this.x = 0;
        } else if (this.y<0){ // up path, bunny goes back in the map from the bottom
            this.y = height;
        } else if (this.y>height){ //down path, bunny goes back in the from from the top
            this.y = 0;
        } else if ((direction == 1)&&(this.currPos == 2)){ //wall on the RIGHT
            let prev_x = this.x-this.s;
            this.x = prev_x;
        } else if ((direction == 3)&&(this.currPos == 2)){ //wall on the LEFT
            let prev_x = this.x+this.s;
            this.x = prev_x;
        } else if ((direction == 2)&&(this.currPos == 2)){ //wall UP
            let prev_y = this.y+this.s;
            this.y = prev_y;
        } else if ((direction == 4)&&(this.currPos == 2)){ //wall DOWN
            let prev_y = this.y-this.s;
            this.y = prev_y;
        }

    }


    display(){
        this.checkWall();
        fill(255, 255, 0)
        image(this.image, this.x-7, this.y-7, this.s+15, this.s+15);
    }
}