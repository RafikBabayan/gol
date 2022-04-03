var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3001);

weath = "winter";

poisongrassArr = []
poisoneaterArr = []
grasseaterArr = []
grassArr = []

function matrixcreater(length, height, grass, grasseater, poisoneater, poisongrass) {
    let b = []
    for (let i = 0; i < height; i++) {
        b.push([]);
        for (let j = 0; j < length; j++) {
            b[i].push(0);
        }
    }

    for (let i = 0; i < grass; i++) {
        let x = Math.round(Math.random() * (length - 1))
        let y = Math.round(Math.random() * (height - 1))


        b[y][x] = 1

    }
    for (let i = 0; i < grasseater; i++) {
        let x = Math.round(Math.random() * (length - 1))
        let y = Math.round(Math.random() * (height - 1))


        b[y][x] = 2

    }
    for (let i = 0; i < poisoneater; i++) {
        let x = Math.round(Math.random() * (length - 1))
        let y = Math.round(Math.random() * (height - 1))


        b[y][x] = 3

    }
    for (let i = 0; i < poisongrass; i++) {
        let x = Math.round(Math.random() * (length - 1))
        let y = Math.round(Math.random() * (height - 1))


        b[y][x] = 4

    }
    return b
}
matrix = matrixcreater(50, 50, 45, 60, 60, 45)
io.sockets.emit('send matrix', matrix)

Grass = require("./grass")
GrassEater = require("./grasseater")
PoisonGrass = require("./poisongrass")
PoisonEater = require("./poisoneater")


function objectfiller(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y))
            }
            else if (matrix[y][x] == 2) {
                grasseaterArr.push(new GrassEater(x, y))
            }
            else if (matrix[y][x] == 3) {
                poisoneaterArr.push(new PoisonEater(x, y))
            }
            else if (matrix[y][x] == 4) {
                poisongrassArr.push(new PoisonGrass(x, y))
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {

    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }

    for (let i = 0; i < grasseaterArr.length; i++) {
        grasseaterArr[i].eat()
    }

    for (let i = 0; i < poisoneaterArr.length; i++) {
        poisoneaterArr[i].eat()
    }

    for (let i = 0; i < poisongrassArr.length; i++) {
        poisongrassArr[i].mul()
    }
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 1000)



function kill() {
    poisongrassArr = []
    poisoneaterArr = []
    grasseaterArr = []
    grassArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grasseaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPoisonGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            poisongrassArr.push(new PoisonGrass(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPoisonEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            poisoneaterArr.push(new PoisonEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grasseaterArr.length;
    statistics.poisonGrass = poisongrassArr.length;
    statistics.poisonEater = poisoneaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){})
},200)



io.on('connection', function (socket) {
    objectfiller(matrix)
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add poisonGrass", addPoisonGrass);
    socket.on("add poisonEater", addPoisonEater);
})