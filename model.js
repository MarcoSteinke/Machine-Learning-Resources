let inputs, outputs;
let targetLabel = 'C';

// Setup options for the model used during training and evaluation.
let options = {
    // those exact names must be used for the training data.
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classfication',
    debug: true
};

// Create the model.
let model = ml5.neuralNetwork(options);

// Initialize the front-end.
function setup() {
    createCanvas(400, 400);

    background(240);
}

function keyPressed() {
    targetLabel = (key == 'c' || key == 'd' || key == 'e') ? key.toUpperCase() : 'C';
}

function updateFrontend() {
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
}

function mousePressed() {

    // Stored mouse coordinates for the inputs.
    let inputs = {
        x: mouseX,
        y: mouseY
    };

    // Store the current label.
    let target = {
        label: targetLabel
    };

    // Add data to the model.
    model.addData(inputs, target);

    // Update the front-end.
    updateFrontend();
}