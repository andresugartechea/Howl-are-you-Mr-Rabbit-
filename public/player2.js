class Player2 extends Player{
    constructor(x, y, size, image_name){
        super(x, y, size, image_name);
        this.image = loadImage(image_name)

        this.pl_x = x;
        this.pl_y = y;
    }

    move(){
        if (direction_pl2 == 1){
            this.x += this.xspeed;
        }
        else if (direction_pl2 == 2){
            this.y -= this.yspeed;
        }
        else if (direction_pl2 == 3){
            this.x -= this.xspeed;
        }
        else if (direction_pl2 == 4){
            this.y += this.yspeed;
        }
    }

    checkWall(){
        this.currPos = this.getCurrValue(this.x, this.y);

        if (this.x==-this.s){ //left path,pacman goes back in the map on the right
            this.x = width-this.s;
        } else if (this.x>=width) { //right path,pacman goes back in the map on the left
            this.x = 0;
        } else if (this.y<0){ // up path, pacman goes back in the map from the bottom
            this.y = height;
        } else if (this.y>height){ //down path, pacman goes back in the from from the top
            this.y = 0;
        } else if ((direction_pl2 == 1)&&(this.currPos == 2)){ //wall on the RIGHT
            let prev_x = this.x-this.s;
            this.x = prev_x;
        } else if ((direction_pl2 == 3)&&(this.currPos == 2)){ //wall on the LEFT
            let prev_x = this.x+this.s;
            this.x = prev_x;
        } else if ((direction_pl2 == 2)&&(this.currPos == 2)){ //wall UP
            let prev_y = this.y+this.s;
            this.y = prev_y;
        } else if ((direction_pl2 == 4)&&(this.currPos == 2)){ //UP
            let prev_y = this.y-this.s;
            this.y = prev_y;
        }

    }
}