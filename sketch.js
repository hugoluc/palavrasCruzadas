//Array of words in the words system
var words = [];

function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  frameRate(60);

  btn = new inspectionBtn()
  definitionPage = new wordDefinition()
  menu = new menuPage()
  system = new WordSystem(createVector(canvasSize.width/2, canvasSize.height/2 - btn.size.height));
  //

}
var framecount = 0
var frameMedian = 0
function draw() {

  if (framecount > 100){
    console.log(frameMedian/framecount,system.displayWords.length);
    frameMedian = 0
    framecount = 0
  }else{
    framecount++
    frameMedian = frameMedian + frameRate()
  }

  background(26, 24, 25);

  if(enableCanvas){
    system.run();
  }
  btn.show()

}
