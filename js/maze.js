define(["jquery"], function ($) {

    var Cell = function (i, j) {
        var self = this;
        self.i = i;
        self.j = j;
        self.visited = false;
        self.visit = function () {
            self.visited = true;
        }
        self.getNext = function(dir, arr)
        {
            switch (dir) {
                case DIRECTION.UP:
                    return arr[i - 1][j];
                case DIRECTION.RIGHT:
                    return arr[i][j + 1];
                case DIRECTION.DOWN:
                    return arr[i + 1][j];
                case DIRECTION.LEFT:
                    return arr[i][j - 1];
            }
        }
        self.openTo= function(dir, arr)
        {
            switch (dir) {
                case DIRECTION.UP:
                    arr[i][j].openUp = true;
                    arr[i - 1][j].openDown = true;
                    break;
                case DIRECTION.RIGHT:
                    arr[i][j].openRight = true;
                    arr[i][j + 1].openLeft = true;
                    break;
                case DIRECTION.DOWN:
                    arr[i][j].openDown = true;
                    arr[i + 1][j].openUp = true;
                    break;
                case DIRECTION.LEFT:
                    arr[i][j].openLeft = true;
                    arr[i][j - 1].openRight = true;
                    break;
            }
        }
    };

    var getNextCell = function (i, j, dir, arr) {

    };

    var openToCell = function (i, j, dir, arr) {

    };

    var setting, cells;

    var Maze = function (setting) {
        setting = setting;
        cells = [];
        this.cells = cells;

        this.generate = function () {

            var stack = [],
                currentCell = {},
                totalCells = setting.rows * setting.columns,
                visitedCells = 0;

            for (var i = 0; i < setting.rows; i++) {
                cells[i] = [];
                for (var j = 0; j < setting.columns; j++) {
                    cells[i][j] = new Cell(i, j);
                }
            }

            currentCell = cells[0][0];
            currentCell.visit();
            visitedCells++;

            while (visitedCells < totalCells) {
                //find all neighbors of CurrentCell with all walls intact
                var goodNeighbors = [];
                var i = currentCell.i, j = currentCell.j;
                if (i >= 1 && !cells[i - 1][j].visited) {
                    goodNeighbors.push(DIRECTION.UP);
                }
                if (j < (setting.columns - 1) && !cells[i][j + 1].visited) {
                    goodNeighbors.push(DIRECTION.RIGHT);
                }
                if (i < (setting.rows - 1) && !cells[i + 1][j].visited) {
                    goodNeighbors.push(DIRECTION.DOWN);
                }
                if (j >= 1 && !cells[i][j - 1].visited) {
                    goodNeighbors.push(DIRECTION.LEFT);
                }

                // if one or more found
                if (goodNeighbors.length > 0) {
                    // choose one at random
                    var nDir = goodNeighbors[Math.floor(Math.random() * goodNeighbors.length)];
                    // knock down the wall between it and CurrentCell
                    currentCell.openTo(nDir, cells);
                    // push CurrentCell location on the CellStack
                    stack.push(cells[i][j]);
                    // make the new cell CurrentCell
                    currentCell = currentCell.getNext(nDir, cells);
                    currentCell.visit();
                    // add 1 to VisitedCells
                    visitedCells++;
                } else {
                    // pop the most recent cell entry off the CellStack
                    // make it CurrentCell
                    currentCell = stack.pop();
                }
            }
        };
    };

    var DIRECTION = {
        UP: 1,
        RIGHT: 2,
        DOWN: 3,
        LEFT: 4
    };

    return Maze;
});