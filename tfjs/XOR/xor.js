async function runModel() {

// Build and compile model.
const model = tf.sequential();
model.add(tf.layers.dense({units: 2, inputShape: [1]}));
model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

// Generate some synthetic data for training.
const xs = tf.tensor([[1,0]]);
const ys = tf.tensor([1]);

// Train model with fit().
await model.fit(xs, ys, {epochs: 10});

// Run inference with predict().
model.predict(tf.tensor2d([0,1])).print();
}

runModel();