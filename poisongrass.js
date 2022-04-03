let LivingCreature = require('./livingcreature')

module.exports = class PoisonGrass extends LivingCreature {

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if(this.multiply > 1 && newCell) {
            var newPoisonGrass = new PoisonGrass(newCell[0],newCell[1]);
            poisongrassArr.push(newPoisonGrass);
            matrix[newCell[1]][newCell[0]] = 4
            this.multiply = 0;
        }
    }
}

