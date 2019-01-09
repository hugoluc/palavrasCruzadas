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

function draw() {


    background(26, 24, 25);
    btn.show()

    if(enableCanvas){

    //Time intervals between new word is created and added to the system
    var timer = millis();

    if (timer >= 1000) {
      if (random(1) < 0.009) {
        system.addWord();
      }

      system.run();

      timer = 0;
    }

  }

}
