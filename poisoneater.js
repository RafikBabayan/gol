let LivingCreature = require('./livingcreature')

module.exports = class PoisonEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 18;
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
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    eat() {
        var emptyCells = this.chooseCell(1)
        var emptyCells1 = this.chooseCell(4)
        var emptyCells2 = this.chooseCell(0)
        var emptyCells3 = this.chooseCell(2)
        var newcell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var newcell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        var newcell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        var newcell3 = emptyCells3[Math.floor(Math.random() * emptyCells3.length)]
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
        else if (newcell3) {
            this.fight()
        }


    }
    move() {
        var emptyCells2 = this.chooseCell(0)
        var newcell = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
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
        var emptyCells2 = this.chooseCell(0)
        var newcell = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]


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
    fight() {
        var emptyCells2 = this.chooseCell(2)
        var newcell = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        let chance = Math.round(Math.random())
        if (chance == 1) {
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
        else if (chance == 0) {
            this.die()
        }
    }
}

