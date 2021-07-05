async function train(model, input) {

        await model.fitDataset(
            input,
            {
                batchSize: 32,
                epochs: EPOCHS,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        document.querySelector("#log").innerHTML += (`Epoch: ${epoch} / ${EPOCHS}, Loss:${logs.loss.toFixed(4)}\n`);
                        document.querySelector("#log").scrollTo(0,10e4);
                        document.querySelector("#log").style.display = "block";
                    },
                    onTrainEnd: (logs) => {
                        document.querySelector("#afterTraining").innerHTML = `Training finished after ${calculateTimeInSeconds()} seconds. Scroll down to see the performance!`;
                        document.querySelector("#result").style.display = "block";
                    }
                }
            },
            
        );
}

async function runModel(model, input) {

    startTime = Date.now();

    await train(model, input);

    endTime = Date.now();

    // Check model for correct results:

    model.summary();

    predictInput(model);
}

function calculateTimeInSeconds() {
    return Math.abs((endTime - startTime) / 1000);
}

async function predictInput() {

    let i = 0;
    let prediction;

    for(let i = 0; i < xInput.length; i++) {
        let input = xInput[i];
        console.log(`Predicting input [${input[0]}, ${input[1]}]`)
        prediction = await model.predict(tf.tensor([[input[0], input[1]]], [1,2])).array();
        document.querySelectorAll(".prediction")[i].innerHTML = (prediction[0][0]).toFixed(4);
    }
}

// time measurement
let startTime, endTime;

// Build and compile model.
const model = tf.sequential();
const EPOCHS = 500;
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

//runModel(model, input);

