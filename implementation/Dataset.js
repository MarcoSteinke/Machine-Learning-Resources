class Dataset {

    dimension;

    constructor() {
        this.data = [];
        this.dimension = 2;
    }

    add = (entry) => this.data.push(entry);

    setDimension = (dimension) => this.dimension = dimension;

    getDimension = () => this.dimension;

    static create(dimension, size, min, max) {
        const dataset = [];

        for(let i = 0; i < size; i++) {
            this.data.push(Dataset.buildEntry(dimension, size, min, max));
        }
    }

    static buildEntry(dimension, size, min, max) {
        const entryVariables = [];

        for(let i = 0; i < size; i++) {
            entryVariables.push(Dataset.random(min, max));
        }

        return new Entry
    }

    static random(min,max) {
        return min + Math.floor(Math.random() * ( ( (min <= 0) ? Math.abs(min) : 0 ) + max + 1));
    }
}