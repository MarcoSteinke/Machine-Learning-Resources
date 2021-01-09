let inputs, outputs;
let targetLabel = 'C';

let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classfication',
    debug: true
};

let model = ml5.neuralNetwork(options);

function setup() {
    createCanvas(400, 400);

    background(240);
}

function keyPressed() {
    targetLabel = (key == 'c' || key == 'd' || key == 'e') ? key.toUpperCase() : 'C';
}

function mousePressed() {
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
}