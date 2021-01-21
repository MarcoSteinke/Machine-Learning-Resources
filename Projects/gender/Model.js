// Define options for the model
let options = {
    inputs: ['name'],
    outputs: ['gender'],
    task: 'classification',
};

const model = ml5.neuralNetwork(options);

// Format the data from your API/database
let data = database.formatData();

data.forEach(person => {

    model.addData(
        { name:  nameToInt(person.name)}, 
        { gender: person.gender }
    )}
);

function nameToInt(name) {
    let charcodes = [];
    for(let i in name) charcodes.push(name.charCodeAt(i));
    return parseInt(charcodes.join(''));
}

// Define trainingOptions
const trainingOptions = {
    epochs: 400
};

// Implement necessary methods

function whileTraining(epoch, loss) {
    console.log((loss) ? [epoch, loss].join(',') : epoch);
}

function finishedTraining() {
    console.log('finished training');
    console.log(model);
}

// Normalize data
//model.normalizeData();

// Start the training process
model.train(trainingOptions, whileTraining, finishedTraining);

function gotResults(error, result) {
    document.querySelector("#result").innerHTML = (error) ? error : result;
}

function classify() {
    let input = document.querySelector("#name").value;
    model.classify({name: nameToInt(input)}, gotResults);
}