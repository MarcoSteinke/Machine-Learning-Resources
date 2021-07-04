// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [2]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training.
const xs = tf.data.array([
    tf.tensor([0,0]),
    tf.tensor([0,1]),
    tf.tensor([1,0]),
    tf.tensor([1,1]),
]);
const ys = tf.data.array([
    tf.tensor([0]),
    tf.tensor([1]),
    tf.tensor([1]),
    tf.tensor([0]),
]);

// Train the model
model.fit(xs,ys).then(() => {
    // Use the model to do inference on a data point the model hasn't seen before:
    // Open the browser devtools to see the output
    model.predict(tf.tensor[1,0]).print();
});