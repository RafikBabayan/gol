var socket = io();
var side = 10;

function setup() {
    createCanvas(50 * side, 50 * side);
    background("#acacac");
}


socket.on("weather", function (data) {
    weath = data;
})



function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1){
                if(weath == "summer") {
                fill("green");
            }else if (weath == "autumn") {
                fill("#333300");
            }else if (weath == "winter") {
                fill("white");
            }else if (weath == "spring") {
                fill("#4dffa6");
            }}
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("blue")
            }
            else if (matrix[y][x] == 4) {
                if(weath == "summer") {
                    fill("purple");
                }else if (weath == "autumn") {
                    fill("#6f5b7a");
                }else if (weath == "winter") {
                    fill("#ead2f7");
                }else if (weath == "spring") {
                    fill("#dca5fa");}
            }

            rect(x * side, y * side, side, side);
        }
    }
}

setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },200
)


function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPoisonGrass() {
    socket.emit("add poisonGrass")
}
function addPoisonEater() {
    socket.emit("add poisonEater")
}