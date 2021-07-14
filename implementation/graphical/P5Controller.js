const width = myClassifier.canvasSize;

function setup() {
  createCanvas(width, width);
}

function draw() {
  background(220);
  myClassifier.dataset.getData().forEach(
      entry => {
          fill(255);
          ellipse(entry.getCoordinates()["x0"] + width/2, entry.getCoordinates()["x1"] + width/2, 1/20 * width, 1/20 * width);
          fill(0);
          text(entry.getLabel(), entry.getCoordinates()["x0"] + width/2 - .01 * width, entry.getCoordinates()["x1"] + width/2 + .01 * width);
          fill(220);
      }
  )
}
