async function runModel() {

// Build and compile model.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [2]}));
model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

// Generate some synthetic data for training.
const xs = tf.tensor2d([[1,0]]);
const ys = tf.tensor2d([1], [1,1]);

// Train model with fit().
await model.fit(xs, ys, {epochs: 2000});

// Run inference with predict().
console.log("Model output for [0,0]");
model.predict(tf.tensor2d([0,0], [1,2])).print();
console.log("Model output for [0,1]");
model.predict(tf.tensor2d([0,1], [1,2])).print();
console.log("Model output for [1,0]");
model.predict(tf.tensor2d([1,0], [1,2])).print();
console.log("Model output for [1,1]");
model.predict(tf.tensor2d([1,1], [1,2])).print();
}

runModel();