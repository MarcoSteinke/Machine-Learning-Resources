class Classifier {

    min;
    max;
    dataset;

    constructor() {
        this.dataset = new Dataset();
    }

    static create() {
        return new Classifier();
    }

    build() {
        return this;
    }

    dimension(dimension) {
        this.dataset.setDimension(dimension);
        
        return this;
    }

    getDimension() {
        return this.dataset.getDimension();
    }

    data = (dataset) => this.dataset = dataset;

    range(min, max) {
        this.min = min;
        this.max = max;
        
        return this;
    }

    normalize() {
        console.log("foo");
    }
}