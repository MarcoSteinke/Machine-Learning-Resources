const model = tf.sequential();
model.add(tf.layers.dense({units: 4, inputShape: [8]}));
model.add(tf.layers.dense({units: 4}));
model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

// kernel:
model.layers[0].getWeights()[0].print()

// bias:
model.layers[0].getWeights()[1].print()
