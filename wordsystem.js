//Source words
var json = ["unicorn", "purple", "love", "heart"];
var selectedWord;


class WordSystem {

  constructor(position) {
    //Array of words in the words system
    this.words = []
    this.origin = position.copy();

  }


  addWord() {

    //Select the word from the source
    selectedWord = random(json);
    //Pass is to the Word class constructor
    this.words.push(new Word(selectedWord, this.origin));
  }


  run() {

    for (var i = this.words.length - 1; i >= 0; i--) {
      var w = this.words[i];
      w.show();
      w.move();
      w.grow();
      w.white();
      w.drag();

      // If the word status is dead, out of the canvas, deleted it from the array
      if (w.kill()) {
        this.words.splice(i, 1);
        print ("WORD IS DEAD");
        print (this.words.length);
      }

    }

  }


}
