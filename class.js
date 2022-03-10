
class Grass {
    constructor(x, y) {
        this.multyply = 0
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    mul() {
        let azatcordinatner = this.chooseCell(0)
        let newcell = random(azatcordinatner);


        if (newcell && this.multyply > 1) {
            let x = newcell[0]
            let y = newcell[1]
            matrix[y][x] = 1
            grassArr.push(new Grass(x, y))
            this.multyply = 0
        }

        this.multyply++
    }
}



class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        const found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    eat() {
        let newcell = random(this.chooseCell(1));
        let newcell1 = random(this.chooseCell(4))
        let newcell2 = random(this.chooseCell(0))
        let newcell3 = random(this.chooseCell(3))
        if (newcell) {
            let x1 = newcell[0]
            let y1 = newcell[1]
            matrix[this.y][this.x] = 0
            this.x = x1
            this.y = y1
            matrix[this.y][this.x] = 2
            for (var i in grassArr) {
                if (x1 == grassArr[i].x && y1 == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.energy++
            if (this.energy >= 20) {
                this.mul()
            }
        }
        else if (newcell2) {
            this.move()
        }
        else if (newcell1) {
            let x1 = newcell1[0]
            let y1 = newcell1[1]
            matrix[this.y][this.x] = 0
            this.x = x1
            this.y = y1
            matrix[this.y][this.x] = 2
            for (var i in poisongrassArr) {
                if (x1 == poisongrassArr[i].x && y1 == poisongrassArr[i].y) {
                    poisongrassArr.splice(i, 1);
                    break;
                }
            }
            this.die()
        }
        else if(newcell3){
            this.fight()
        }

    }
    move() {
        let azatcordinatner = this.chooseCell(0)
        let newcell = random(azatcordinatner);
        this.energy--
        if (this.energy <= 0) {
            this.die()

        }
        else if (newcell) {
            let x1 = newcell[0]
            let y1 = newcell[1]
            matrix[this.y][this.x] = 0
            this.x = x1
            this.y = y1
            matrix[this.y][this.x] = 2
        }
    }
    mul() {
        this.energy = 0
        let azatcordinatner = this.chooseCell(0)
        let newcell = random(azatcordinatner);


        if (newcell) {
            let x = newcell[0]
            let y = newcell[1]
            matrix[y][x] = 2
            grasseaterArr.push(new GrassEater(x, y))
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                grasseaterArr.splice(i, 1);
                break;
            }
        }
    }
    fight(){
        let azatcordinatner = this.chooseCell(3)
        let newcell = random(azatcordinatner);
        let chance = Math.round(Math.random())
        if(chance == 1){
            let x1 = newcell[0]
            let y1 = newcell[1]
            matrix[this.y][this.x] = 0
            this.x = x1
            this.y = y1
            matrix[this.y][this.x] = 2
            for (var i in poisoneaterArr) {
                if (x1 == poisoneaterArr[i].x && y1 == poisoneaterArr[i].y) {
                    poisoneaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if(chance == 0){
            this.die()
        }
    }
}




class PoisonGrass {
    constructor(x, y) {
        this.multyply = 0
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    mul() {
        let azatcordinatner = this.chooseCell(0)
        let newcell = random(azatcordinatner);


        if (newcell && this.multyply > 1) {
            let x = newcell[0]
            let y = newcell[1]
            matrix[y][x] = 4
            poisongrassArr.push(new PoisonGrass(x, y))
            this.multyply = 0
        }

        this.multyply++
    }
}




class PoisonEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        const found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    eat() {
        let newcell = random(this.chooseCell(1));
        let newcell1 = random(this.chooseCell(4))
        let newcell2 = random(this.chooseCell(0))
        let newcell3 = random(this.chooseCell(2))
        if (newcell1) {
            let x1 = newcell1[0]
            let y1 = newcell1[1]
            matrix[this.y][this.x] = 0
            this.x = x1
            this.y = y1
            matrix[this.y][this.x] = 3
            for (var i in poisongrassArr) {
                if (x1 == poisongrassArr[i].x && y1 == poisongrassArr[i].y) {
                    poisongrassArr.splice(i, 1);
                    break;
                }
            }
            this.energy++
            if (this.energy >= 20) {
                this.mul()
            }
        }
        else if (newcell2) {
            this.move()
        }
        else if (newcell) {
            let x1 = newcell[0]
            let y1 = newcell[1]
            matrix[this.y][this.x] = 0
            this.x = x1
            this.y = y1
            matrix[this.y][this.x] = 3
            for (var i in grassArr) {
                if (x1 == grassArr[i].x && y1 == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.die()
        }
        else if(newcell3){
            this.fight()
        }


    }
    move() {
        let azatcordinatner = this.chooseCell(0)
        let newcell = random(azatcordinatner);
        this.energy--
        if (this.energy <= 0) {
            this.die()

        }
        else if (newcell) {
            let x1 = newcell[0]
            let y1 = newcell[1]
            matrix[this.y][this.x] = 0
            this.x = x1
            this.y = y1
            matrix[this.y][this.x] = 3
        }
    }
    mul() {
        this.energy = 0
        let azatcordinatner = this.chooseCell(0)
        let newcell = random(azatcordinatner);


        if (newcell) {
            let x = newcell[0]
            let y = newcell[1]
            matrix[y][x] = 3
            poisoneaterArr.push(new PoisonEater(x, y))
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in poisoneaterArr) {
            if (this.x == poisoneaterArr[i].x && this.y == poisoneaterArr[i].y) {
                poisoneaterArr.splice(i, 1);
                break;
            }
        }
    }
    fight(){
        let azatcordinatner = this.chooseCell(3)
        let newcell = random(azatcordinatner);
        let chance = Math.round(Math.random())
        if(chance == 1){
            let x1 = newcell[0]
            let y1 = newcell[1]
            matrix[this.y][this.x] = 0
            this.x = x1
            this.y = y1
            matrix[this.y][this.x] = 3
            for (var i in grasseaterArr) {
                if (x1 == grasseaterArr[i].x && y1 == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if(chance == 0){
            this.die()
        }
    }
}

