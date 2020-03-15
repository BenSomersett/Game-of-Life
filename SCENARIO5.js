//generate two dimensional array
function TwoDemGrid(columns, rows){
  let twodemgrid = new Array(columns);
      for (let a = 0; a < twodemgrid.length; a++) {
      twodemgrid[a] = new Array(rows);
}
  return twodemgrid;
}

//declare variables
//render visual display
//must be 5x5 grid
//equally sized and spaced squares
let grid;
let columns;
let rows;
let size = 20;

function setup() {
  createCanvas(100, 100);
  columns = width / size;
  rows = height / size;     //100/20 = 5x5


//seed grid using 'for' loop
//must be centre three cells vertically or horizontally
  grid = TwoDemGrid(columns, rows);
  for (let a = 0; a < columns; a++) {
  for (let b = 0; b < rows; b++) {
      grid [a][b]= floor (0); //NO LIVE CELLS
    }
  }
}


//render grid in browser display using 'for' loop
//white for vacant cells, black for live cells
function draw() {
  background(0);
  for (let a = 0; a < columns; a++) {
  for (let b = 0; b < rows; b++) {
      let x = a * size; // cell size (20)
      let y = b * size;
      if (grid[a][b] == 0) {
        rect(x, y, size - 1, size - 1); //render shape
        stroke(0); //dividing lines colour
        fill(255); //cell colour


      }
    }
  }

//define function that renders grid as 'infinite' plane
//leftmost cell is neighbour of righmost in row
//uppermost cell is neighbour of lowest in column

  function countNeighbour(grid, x, y) {
    let sum = 0;
    for (let a = -1; a < 2; a++) {
    for (let b = -1; b < 2; b++) {
        let row = (y + b + rows) % rows;
        let col = (x + a + columns) % columns;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  }


//generate new grid based on current grid only
  let next = TwoDemGrid(columns, rows);


//loop to check entire grid state
  for (let a = 0; a < columns; a++) {
  for (let b = 0; b < rows; b++) {
      let state = grid[a][b];


// Count live neighbouring cells
      let sum = 0;
      let Neighbour = countNeighbour(grid, a, b);

//GoL Scenario 4.Creation of Life
      if (state == 0 && Neighbour == 3) {
        next[a][b] = 1; //cell becomes live

// GoL Scenario 2.Underpopulation(<2) & 3.Overcrowding(>3)
      } else if (state == 1 && (Neighbour < 2 || Neighbour > 3)) {
        next[a][b] = 0; //cell dies

// GoL Scenario 1.No Interactions
      } else {
        next[a][b] = state; //nothing happens
      }
    }
  }
  grid = next; //return solution
}
