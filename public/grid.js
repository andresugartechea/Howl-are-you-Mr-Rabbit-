// This code is based on the following Grid example: https://editor.p5js.org/itp42/sketches/dBeLZC8mm


class Grid {
    constructor(size, rows, cols, img_1) {
      //the numbers indicate the values of the cells: 0 - empty cells, 1 - for apples, 2 - walls/inaccessible cells, 3 - carrots, 4 - rotten/grey apples
      this.grid = `
        222222222222222222222222222222
        231111111111132231111111111132
        212222212222212212222212222212
        212222212222212212222212222212
        212222212222212212222212222212
        211111111111111111111111111112
        212222212212222222212212222212
        212222212212222222212212222212
        231111112211112211112211111132
        222222212222212212222212222222
        222222212222212212222212222222
        222222212211111111112212222222
        222222212212220022212212222222
        222222212212200002212212222222
        111111131112200002211131111111
        222222212212222222212212222222
        222222212211111111112212222222
        222222212212222222212212222222
        222222212212222222212212222222
        231111111111112211111111111132
        212222212222212212222212222212
        212222212222212212222212222212
        211122211111110111111112221112
        222122212212222222212212221222
        222122212212222222212212221222
        211111112211112211112211111112
        212222222222212212222222222212
        212222222222212212222222222212
        231111111111111111111111111132
        222222222222222222222222222222
        `;
      this.grid = this.grid.replace(/\s/g, ""); // this line removes the spaces in the string
      this.size = size;
      this.rows = rows;
      this.cols = cols;

      //my variables
      this.currVal = 0; //value where the bunny starts
      this.toWin = (this.grid.match(/1/g) || []).length; //counts all the apples to check how many are left to eat

      //images for textures;
      this.carrot = loadImage("images/carrot.png")
      this.apple = loadImage("images/apple.png")
      this.g_apple = loadImage("images/apple2.png")
      this.tree = loadImage("images/tree.png")


      //to change transparency
      this.transparency = 40;

    }
  
    update(gridIndex){ //this function is called when the rabbit eats an apple, so the cell is replaced by an empty one
       this.grid = split(this.grid,""); //to convert into an array
       this.grid[gridIndex] = 0;
       this.grid = join(this.grid, ""); //to convert back into a string
    }

    update2(gridIndex2){ //this function is called when the wolf eats an apple, so the cell is replaced by a rotten apple
      this.grid = split(this.grid,""); //to convert into an array
      this.grid[gridIndex2] = 4;
      this.grid = join(this.grid, ""); //to convert back into a string
   }

    draw() {

      //we update the grid based on user input
      this.update();
      this.update2();


      //iterate through the values in this.grid and this.update(). The values are replaced by images and rectangles.
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {

          //to get the grid value
          let gridVal = this.grid[j * this.rows + i];

          //cell is filled depending on gridVal
          if (gridVal == 0) { //empty cell
            fill(255,255,0, this.transparency);
            rect(i * this.size, j * this.size, this.size, this.size);

          } else if (gridVal == 1) { //to draw apples
            noStroke();
            noFill();
            rect(i * this.size, j * this.size, this.size, this.size);
            image(this.apple, i * this.size+3, j * this.size+3, this.size-7, this.size-7);

          }else if (gridVal == 2) { //to draw the walls/trees
            noFill();
            fill(0,0,255);
            image(this.tree, i * this.size-7, j * this.size-3, this.size+10, this.size+10);

          }else if (gridVal == 3) { //to draw carrot
            noStroke();
            noFill();
            rect(i * this.size, j * this.size, this.size, this.size);
            image(this.carrot, i * this.size, j * this.size, this.size+3, this.size+3);

          }else if (gridVal == 4){ //rotten apple
            noFill();
            image(this.g_apple, i * this.size+3, j * this.size+3, this.size-7, this.size-7);

          }
        }
      }
    }

    //this gives the value of the cell where the player is
    getCurrValue(x, y) {
        let gridX = floor(x / this.size);
        let gridY = floor(y / this.size);
       // print(gridX, gridY); 
        return this.grid[gridY* this.cols + gridX];
    }

    //this gives the index of the cell where the player is
    getCurrCell(x, y){
        let gridX = floor(x / this.size);
        let gridY = floor(y / this.size);
  
        return (gridY* this.cols + gridX);
    }
    

  }