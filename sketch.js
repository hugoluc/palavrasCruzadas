//Source words
var json = ["unicorn", "purple", "love", "heart"];

//Array of words in the words system
var words = [];
var btn = new inspectionBtn()



function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  frameRate(60)

}

function draw() {
  background(26, 24, 25);

  //Time intervals between new word is created and displayed
  var timer = millis();

  if (timer >= 10000) {


    if (random(1) < 0.009) {
      //Select the word from the source
      selectedWord = random(json);
      //Pass is to the Word class constructor
      let w = new Word(selectedWord);
      //Add it to the words system array
      words.push(w);
    }


    for (var i = words.length - 1; i >= 0; i--) {
      words[i].show();
      words[i].move();
      words[i].grow();
      words[i].white();
      words[i].drag();
      words[i].kill();
    }

    btn.show()

    timer = 0;
  }

}
