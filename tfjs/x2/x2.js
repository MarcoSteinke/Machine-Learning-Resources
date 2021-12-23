const data = [];

const model = tf.sequential();

model.add(tf.layers.dense({units: 20, inputShape: [20,2], activation: 'relu'}))

model.compile({loss: 'meanSquaredError', optimizer: 'sgd', metrics: ['accuracy']})

const xs = tf.tensor2d([])