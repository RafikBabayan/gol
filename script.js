

var side = 10;
const poisongrassArr = []
const poisoneaterArr = []
const grasseaterArr = []
const grassArr = []

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
const matrix = matrixcreater(50, 50, 45, 60, 60, 45)
function setup() {
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
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
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
                fill("purple")
            }

            rect(x * side, y * side, side, side);
        }
    }
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
}
