var system;

//Array of words in the words system
var words = [];

function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  frameRate(60);

  system = new WordSystem(createVector(180, 260));
  definitionPage = new wordDefinition()
  btn = new inspectionBtn()
  menu = new menuPage()

  btn.nextPage(() => {

    definitionPage.init(data.palavras[0], () => {

        menu.init(data.menu)

     })

  })

}

function draw() {
  background(26, 24, 25);

  //Time intervals between new word is created and added to the system
   var timer = millis();

   if (timer >= 1000) {
     if (random(1) < 0.009) {
       system.addWord();
     }

     system.run();
     btn.show()

     timer = 0;
   }

}
