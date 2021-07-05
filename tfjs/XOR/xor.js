function createDataPoint(x, y, label) {
    return {
        x: x,
        y: y,
        label: label
    };
}

async function train(model, input) {

    

    // Train model with fit().
    for(let dataPoint in input) {
        await model.fit(tf.tensor2d([[input[dataPoint].x, input[dataPoint].y]]), tf.tensor2d([input[dataPoint].label], [1,1]));
    }

    console.log("Training complete");

    
}

async function runModel(model, input) {
    await train(model, input);

    // Check model for correct results:

    input.forEach(
        dataPoint => {
            console.log(`Model output for [${dataPoint.x}, ${dataPoint.y}]`);
            model.predict(tf.tensor2d([dataPoint.x, dataPoint.y], [1,2])).print();
        }
    )
}

// Build and compile model.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [2]}));
model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

// Generate some synthetic data for training.
const input = [
    createDataPoint(0,0,0),
    createDataPoint(0,1,1),
    createDataPoint(1,0,1),
    createDataPoint(1,1,0),
]

runModel(model, input);

