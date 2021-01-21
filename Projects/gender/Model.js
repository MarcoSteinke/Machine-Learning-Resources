// Define options for the model
const options = {
    inputs: ['name'],
    outputs: ['gender'],
    task: 'classification'
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

