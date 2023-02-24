// prepare data
// example input:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
// example output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1]
const inputSize = 4098;
const input = [];
const output = [];
const seriesLength = 16;

for(let i = 0; i < inputSize; i++) {
    let series = new Array(seriesLength).fill([0]);
    let random = Math.floor(Math.random()*seriesLength);
    for(let j = random; j < random+5; j++) {
      if(j < series.length) {
        series[j] = [5];
      }
    }
    input.push(series);
    let outputSeries = new Array(seriesLength).fill([0]);
    outputSeries[random] = [1];
    outputSeries[random+5 < seriesLength ? random+5 : seriesLength-1] = [1];
    output.push(outputSeries);
}

// transform input into tensors
const xs = tf.tensor3d(input, [inputSize, seriesLength, 1]);
const ys = tf.tensor3d(output, [inputSize, seriesLength, 1]);

// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.conv1d({inputShape: [seriesLength, 1], kernelSize: 4, activation: 'sigmoid', padding: 'same', filters: 16}));
model.add(tf.layers.conv1d({inputShape: [seriesLength, seriesLength*2], kernelSize: 4, activation: 'sigmoid', padding: 'same', filters: 32}));



model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training.
model.summary()

// Train the model using the data.
model.fit(xs, ys, {epochs: 100, batchSize: 512, onEpochEnd: function(epoch, logs) {
    console.log(`Training ${epoch}/${epochs} : ${logs}`);
}}).then(() => {
    // Use the model to do inference on a data point the model hasn't seen before:
    model.predict(tf.tensor3d([...(new Array(seriesLength - 4).fill(0)), 1, 1, 1, 1], [1,seriesLength, 1])).print();
    // Open the browser devtools to see the output
  });