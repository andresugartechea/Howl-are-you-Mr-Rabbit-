class Grid {
    constructor(size, rows, cols) {
      //you can create an actual grid with 0s and 1s and 2s and so on
      this.grid = `
        222222222222212222222222222222
        231111131111132231111131111132
        212222212222212212222212222212
        212222212222212212222212222212
        212222212222212212222212222212
        211111131111131131111131111132
        212222212212222222212212222212
        212222212212222222212212222212
        231111112211112211112211111132
        222222212222212212222212222222
        222222212222212212222212222222
        222222212211111111112212222222
        222222212212220022212212222222
        222222212212200002212212222222
        111111111112200002211111111111
        222222212212222222212212222222
        222222212211111111112212222222
        222222212212222222212212222222
        222222212212222222212212222222
        211111111111112211111111111112
        212222212222212212222212222212
        212222212222212212222212222212
        211122241111110111111112221112
        222122212212222222212212221222
        222122212212222222212212221222
        211111112211112211112211111112
        212222222222212212222222222212
        212222222222212212222222222212
        211111111111111111111111111112
        222222222222212222222222222222
        `;
      this.grid = this.grid.replace(/\s/g, ""); // IMP : This step removes all the whitespaces in the grid.
      this.size = size;
      this.rows = rows;
      this.cols = cols;
      this.currVal = 0;
      this.toWin = (this.grid.match(/1/g) || []).length;
    }
  
    update(gridIndex){
       this.grid = split(this.grid,""); //to convert into an array
       this.grid[gridIndex] = 0;
       this.grid = join(this.grid, ""); //to convert back into a string

    }

    draw() {
      //each number in your grid can be a particular element or colour - depends on your game logic
      //loop through the rows and columns and find the grid value at that position in the array
      this.update();

      //console.log(gridArray);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          //get the grid value - is it 0 or 1
          let gridVal = this.grid[j * this.rows + i];
          // depending on the value, you can give it the appropriate colour/shape/image
          if (gridVal == 0) {
            //to draw empty cell
            fill(0);
            rect(i * this.size, j * this.size, this.size, this.size);
          } else if (gridVal == 1) {
            fill(0);
            rect(i * this.size, j * this.size, this.size, this.size);
            //to draw coin
            fill(255, 255, 0);
            ellipse(i * this.size+(this.size/2), j * this.size+(this.size/2), this.size/3, this.size/3);
          }else if (gridVal == 2) {
            //to draw wall
            noFill();
            //fill(0,0,255);
            rect(i * this.size, j * this.size, this.size, this.size);
          }else if (gridVal == 3) {
            fill(0);
            rect(i * this.size, j * this.size, this.size, this.size);
            //to draw power coins
            fill(0, 255, 0);
            ellipse(i * this.size+(this.size/2), j * this.size+(this.size/2), this.size/2, this.size/2);
          }else if (gridVal == 4){
            fill(0);
            rect(i * this.size, j * this.size, this.size, this.size);
            //to draw power coins
            fill(255,0,255);
            ellipse(i * this.size+(this.size/2), j * this.size+(this.size/2), this.size/2, this.size/2);
          }
        }
      }
    }

  // this function is the most important! Given an x and a y it gives you the grid value at that position. Knowing the grid value you can decide what should happen to your player etc.

    getCurrValue(x, y) {
        let gridX = floor(x / this.size);
        let gridY = floor(y / this.size);
       // print(gridX, gridY); 
        return this.grid[gridY* this.cols + gridX]; //this returns gridValue
      }

    getCurrCell(x, y){
        let gridX = floor(x / this.size);
        let gridY = floor(y / this.size);
  
        return (gridY* this.cols + gridX);
    }
    

  }