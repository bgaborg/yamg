define(["jquery", "angular", "maze", "less!app.less"], function ($, angular, Maze) {
    var self = this;
    var yamgApp = angular.module('yamg', []);

    self.setting = {
        rows: 25,
        columns: 50
    };

    self.maze = new Maze(setting);

    yamgApp.controller('configController', function () {
        var cC = this;
        cC.setting = self.setting;
        cC.message = "Ready.";

        cC.generateMaze = function () {
            cC.message = "Generating maze.";
            self.maze.generate();
            cC.message = "Maze generated";
        }
        cC.solveMaze = function () {
            cC.message = "This should solve the maze";
        }
    });

    yamgApp.controller('drawController', function(){
        var dC = this;

        dC.maze = self.maze;
        window.maze = self.maze;
    });


    return yamgApp;
});