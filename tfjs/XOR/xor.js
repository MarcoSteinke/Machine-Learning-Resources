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
        await model.fit(
            tf.tensor2d([[input[dataPoint].x, input[dataPoint].y]]), 
            tf.tensor2d([input[dataPoint].label], [1,1]), 
            {
                batchSize: 32,
                epochs: 800,
                onYield
            },
            
            );
    }
    

    console.log("Training complete");

    
}

function onYield(epoch, batch, logs) {
    if(epoch) {
        console.log(`Epoch: ${epoch}`);
    }
    if(logs) {
        console.log(`Logs: ${logs}`);
    }
}

async function formatResults(datapoints) {
    for(let dataPoint in datapoints) {

        console.log(`Model output for [${datapoints[dataPoint].x}, ${datapoints[dataPoint].y}]`);
        let prediction = (
            await (model.predict(
                tf.tensor2d([
                    datapoints[dataPoint].x, 
                    datapoints[dataPoint].y], 
                    [1,2]
                )
            )).array())[0][0];

        prediction = Math.abs(Math.round(prediction));

        console.log(prediction);
    }
}

async function runModel(model, input) {
    await train(model, input);

    // Check model for correct results:

    await formatResults(input);

    model.summary();
}

// Build and compile model.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [2], activation: 'relu'}));
model.compile({optimizer: 'adam', loss: 'meanSquaredError'});

// Generate some synthetic data for training.
const input = [
    createDataPoint(0,0,0),
    createDataPoint(0,1,1),
    createDataPoint(1,0,1),
    createDataPoint(1,1,0),
]

let sums = new Set();

runModel(model, input);

