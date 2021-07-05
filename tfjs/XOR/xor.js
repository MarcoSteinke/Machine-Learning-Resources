async function train(model, input) {

        await model.fitDataset(
            input,
            {
                batchSize: 32,
                epochs: 2500,
                callbacks: {
                    onEpochEnd: (epoch, logs) => console.log(`Epoch: ${epoch}, Loss: ${logs.loss}`)
                }
            },
            
        );
}


function onYield(epoch, batch, logs) {
    if(epoch) {
        console.log(`Epoch: ${epoch}`);
    }
    if(logs) {
        console.log(`Logs: ${logs}`);
    }
}

async function runModel(model, input) {
    await train(model, input);

    // Check model for correct results:

    model.summary();

    predictInput(model);
}

async function predictInput() {
    xInput.forEach(
        input => {

            console.log(`Predicting input [${input[0]}, ${input[1]}]`)
            model.predict(tf.tensor([[input[0], input[1]]], [1,2])).print();
        }
    )
}

// Build and compile model.
const model = tf.sequential();
model.add(tf.layers.dense({units: 4, inputShape: [2], activation: 'relu'}));
model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}))
model.compile({optimizer: 'adam', loss: 'meanSquaredError', metrics: ['accuracy']});

// Generate some synthetic data for training.
const xInput = [[0,0], [0,1], [1,0], [1,1]];
const yInput = [0, 1, 1, 0];

const xDataset = tf.data.array(xInput);
const yDataset = tf.data.array(yInput);

const input = tf.data.zip(
    {
        xs: xDataset,
        ys: yDataset
    }
).batch(1);

console.log(input);

runModel(model, input);

