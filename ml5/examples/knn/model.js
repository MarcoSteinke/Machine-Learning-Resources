let knnClassifier = ml5.KNNClassifier();
let data = [];
let test = {x: 200, y: 200};

data.push({x: 150, y: 150, label: 0})
data.push({x: 300, y: 300, label: 80})
data.push({x: 100, y: 300, label: 160})
data.push({x: 300, y: 100, label: 240})

function setup() {
  createCanvas(400, 400);
  data.forEach(point => {
    knnClassifier.addExample(Object.values(point).slice(0,2), point.label)
  })
  knnClassifier.classify(Object.values(test), 2, (err, result) => {
    console.log(result);
  })
}

function draw() {
  background(60);
  data.forEach(point => {
    fill(point.label, 150, 150)
    circle(point.x, point.y, 10)
  })
  fill(255,0,0)
  circle(test.x, test.y, 10)
  fill(0)
}