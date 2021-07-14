class Entry {

    coordinates;
    label;

    constructor(coordinates = [], label) {
        this.coordinates = [];
        this.label = label;
        
        coordinates.forEach(variable => this.coordinates.push(variable));
    }

    getCoordinates() {
        let obj = new Object();
        for(let i = 0; i < this.getDimension(); i++) {
            obj["x" + i] = this.coordinates[i];
        }

        return obj;
    }

    getLabel = () => this.label;

    getDimension = () => this.coordinates.length;
}