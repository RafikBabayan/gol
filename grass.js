let LivingCreature = require('./livingcreature')


module.exports = class Grass extends LivingCreature {

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if(this.multiply > 1 && newCell) {
            var newGrass = new Grass(newCell[0],newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1
            this.multiply = 0;
        }
    }
}
