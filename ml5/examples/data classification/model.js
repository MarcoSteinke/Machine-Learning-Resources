let targetLabel = 'C';
let state = 'collecting';

// Setup options for the model used during training and evaluation.
let options = {
    // those exact names must be used for the training data.
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: 'true'
};

let trainingOptions = {
    epochs: 200
};

// Create the model.
let model = ml5.neuralNetwork(options);

// Initialize the front-end.
function setup() {
    createCanvas(400, 400);

    background(240);
}

function keyPressed() {
    if(key == 't') {
        train();
        return;
    }
    targetLabel = (key == 'd' || key == 'e') ? key.toUpperCase() : 'C';
}

function updateFrontend() {

    if(state == 'collecting') {
        stroke(0);
        noFill();
        ellipse(mouseX, mouseY, 24);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(targetLabel, mouseX, mouseY);
    }  
}

function gotResults(error, results) {
    console.log((error) ? error : results);

    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0, 0, 255, 100);
    noStroke();
    textAlign(CENTER, CENTER);
    text(results[0].label, mouseX, mouseY);
}

function finishedTraining() {
    console.log('finished');
    state = 'prediction';
}

function whileTraining(epoch, loss) {
    console.log(epoch);
}


function train() {
    model.normalizeData();
    model.train(trainingOptions, whileTraining, finishedTraining);
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
    if(state == 'collecting') updateFrontend();
    else model.classify(inputs, gotResults);
}