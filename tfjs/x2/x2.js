const data = [];

const model = tf.sequential();

model.add(tf.layers.dense({units: 1, inputShape: [1], activation: 'softmax'}))

model.compile({loss: 'meanSquaredError', optimizer: 'sgd', metrics: ['accuracy']})

const zeroes = new Array(20).fill(0);
const xs = tf.tensor2d(zeroes.map((x,i) => i+1), [20, 1])
xs.print()
console.log(xs.shape);
const ys = tf.tensor2d(zeroes.map((x,i) => (i+1)**2), [20, 1])
ys.print()

train()

async function train() {
    for(let i = 0; i < 1000; i++) {
        await model.fit(xs, ys, {epochs: 1, batchSize: 1, shuffle:true})
        console.log(`${i} / 1000`);
    }
    console.log("finished");
}