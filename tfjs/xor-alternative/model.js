const xor = tf.sequential()

async function print(text) {
  document.querySelector("#output").innerHTML = text
}

xor.add(tf.layers.dense({units: 4, inputShape: [2], activation: 'relu'}))
xor.add(tf.layers.dense({units: 1, activation: 'sigmoid'}))

xor.compile({loss: 'meanSquaredError', optimizer: 'adam', metrics: ['accuracy']})

const xs = tf.tensor2d([
  [0,0],
  [0,1],
  [1,0],
  [1,1]
])

console.log(xs.shape)

const ys = tf.tensor2d([
  [0],
  [1],
  [1],
  [0]
])

train()

async function train() {
  for(let i = 0; i < 2500; i++){
    (await xor.fit(xs, ys, {epochs: 5, batchSize: 3, shuffle: true}))
    console.log([i, 2500].join(" / "));
    
  }
  console.log('done');
  
}