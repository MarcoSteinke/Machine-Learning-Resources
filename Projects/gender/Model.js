// Define options for the model
const options = {
    inputs: ['name'],
    outputs: ['gender'],
    task: 'classification',
};

const model = ml5.neuralNetwork(options);

// Format the data from your API/database
let data = database.formatData();

data.forEach(person => 

    model.addData(
        { name: person.name }, 
        { gender: person.gender }
    )
);

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
}

// Normalize data
model.normalizeData();

// Start the training process
model.train(trainingOptions, whileTraining, finishedTraining);

function results(error, results) {
    document.querySelector("#result").innerHTML = (error) ? error : JSON.stringify(results);
}

function classify() {
    let input = document.querySelector("#name").value;
    model.classify(input, results);
}