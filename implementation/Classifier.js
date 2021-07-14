class Classifier {

    min;
    max;
    dataset;
    dimension;

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
        this.dataset = new Dataset(dimension || 2, this.min || 0, this.max || 10);
        
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

    range(min, max) {
        this.min = min;
        this.max = max;

        this.dataset = new Dataset(this.dimension ? this.dimension : 2, min, max);
        
        return this;
    }

    train = datapoint => this.dataset.add(datapoint);

    normalize() {
        console.log("foo");
    }

    toString = () => {
        const copy = Object.assign(new Object(), this);
        copy.dimension = copy.dataset.getDimension();
        copy.dataset = undefined;
        return JSON.stringify(copy);
    }
}

let class_ = Classifier.create().range(-10,10);
class_.dataset = class_.dataset.create(50);

console.log(class_)

document.querySelector("body").insertAdjacentHTML("beforeend", class_.toString().replaceAll("},", ",<br>").replace("],", "],<br>"));