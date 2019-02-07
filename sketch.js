//Array of words in the words system
var words = [];


function preload(){

<<<<<<< HEAD
  for(i = 0; i <selectedData.palavras.length; i++){
   selectedData.palavras[i].audioObj = loadSound( "audios/" +selectedData.palavras[i].audio)
   selectedData.palavras[i].audioOriginalObj = loadSound( "audios/" +selectedData.palavras[i].audioOriginal)
=======
  sohne = loadFont('Söhne/Söhne-Mager.otf');
  sohneBold = loadFont('Söhne/Söhne-Halbfett.otf');

  for(i = 0; i < data.palavras.length; i++){
    data.palavras[i].audioObj = loadSound( "audios/" + data.palavras[i].audio)
    data.palavras[i].audioOriginalObj = loadSound( "audios/" + data.palavras[i].audioOriginal)
>>>>>>> 312081c78367b31709bff3b7868048e80c796799
  }

}


function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  frameRate(60);

  btn = new inspectionBtn()
  definitionPage = new wordDefinition()
  menu = new menuPage()
  system = new WordSystem(createVector(canvasSize.width/2, canvasSize.height/2 - btn.size.height),selectedData);
  //

}

var framecount = 0
var frameMedian = 0
function draw() {
  //
  // if (framecount > 100){
  //   console.log(frameMedian/framecount,system.displayWords.length);
  //   frameMedian = 0
  //   framecount = 0
  // }else{
  //   framecount++
  //   frameMedian = frameMedian + frameRate()
  // }

  background(26, 24, 25);

  if(enableCanvas && !toDefinition){
    system.run();
  }
  btn.show()

}
