class Classifier {

    min;
    max;
    dataset;
    dimension;
    canvasSize;
    label;

    constructor() {
        this.dataset = new Dataset();
    }

    static create() {
        return new Classifier();
    }

    build() {
        return this;
    }

    dimensions(dimension) {
        this.dataset = new Dataset(dimension || 2, this.min || 0, this.max || 10);
        this.dimension = dimension;
        
        return this;
    }

    getDimension() {
        return this.dataset.getDimension();
    }

    data = (dataset) => {
        this.dataset = dataset;
        this.dimension = dataset.dimension;
        return this;
    }

    setCanvasSize(size) {
        this.canvasSize = size;
        return this;
    } 

    range(min, max) {
        this.min = min;
        this.max = max;

        this.dataset = new Dataset(this.dimension ? this.dimension : 2, min, max);
        this.dataset.setLabelCount(this.label ? this.label : 2);
        
        return this;
    }

    train = datapoint => this.dataset.add(datapoint);

    normalize() {
        console.log("foo");
    }

    labels(labelCount){
        this.label = labelCount;
        this.dataset = new Dataset(this.dimension ? this.dimension : 2, this.min, this.max, labelCount);
        this.dataset.labelCount = labelCount;
        return this;
    }

    toString = () => {
        const copy = Object.assign(new Object(), this);
        copy.dimension = copy.dataset.getDimension();
        copy.dataset = undefined;
        return JSON.stringify(copy);
    }
}

let myClassifier = Classifier
                        .create()
                        .setCanvasSize(400)
                        .dimensions(3)
                        .labels(4)
                        .range(-150,150);

console.log(myClassifier)

myClassifier.dataset = myClassifier.dataset.create(50);


document.querySelector("body").insertAdjacentHTML("beforeend", myClassifier.toString().replaceAll("},", ",<br>").replace("],", "],<br>"));