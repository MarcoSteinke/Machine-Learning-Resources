let inputs, outputs;

let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classfication',
    debug: true
};

let model = ml5.neuralNetwork(options);
