class Player {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xspeed = this.w;
        this.yspeed = this.h;
    }

    move(){
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

    display(){
        fill(255, 255, 0)
        rect(this.x, this.y, this.w, this.h);
    }
}