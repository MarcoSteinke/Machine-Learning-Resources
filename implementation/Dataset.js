class Dataset {

    static dimension;
    min;
    max;
    labelCount;

    constructor(dimension, min, max, labelCount) {
        this.data = [];
        this.min = min;
        this.max = max;
        this.dimension = dimension ? dimension : 2;
        this.labelCount = labelCount;
    }

    add = (entry) => this.data.push(entry);

    setDimension = (dimension) => this.dimension = dimension;

    getDimension = () => this.dimension;

    create(size) {
        const dataset = [];

        for(let i = 0; i < size; i++) {
            dataset.push(this.buildEntry());
        }

        let returnDataset = new Dataset();
        returnDataset.min = this.min;
        returnDataset.max = this.max;
        returnDataset.dimension = this.dimension;
        returnDataset.data = dataset;

        return returnDataset;
    }

    setLabelCount(labelCount) {
        this.labelCount = labelCount;
    }

    getData = () => this.data;

    buildEntry() {
        const entryVariables = [];

        for(let i = 0; i < this.dimension; i++) {
            entryVariables.push(Dataset.random(this.min, this.max));
        }


        return new Entry(entryVariables, Math.floor(Math.random() * this.labelCount));
    }

    static random(min,max) {
        return min + Math.floor(Math.random() * ( ( (min <= 0) ? Math.abs(min) : 0 ) + max + 1));
    }
}