//Source words
var selectedWord;

class WordSystem {

  constructor(position) {
    //Array of words in the words system
    this.words = []
    this.origin = position.copy();
    this.wordId = 0
    this.clearDrag();
  }


  addWord() {

    //Select the word from the source
    selectedWord = random(data.palavras);
    //Pass is to the Word class constructor
    this.words.push(new Word(selectedWord, this.origin, this.wordId));
    this.wordId++
  }

  clearDrag(){

    this.dragId = null;

  }

  checkDrag(){

    if (this.dragId){
      return true;
    }else{
      return false;
    }

  }

  checkWordsClick(){

    for (var i = this.words.length - 1; i >= 0; i--) {

      if(this.words[i].checkClick()){

        this.dragId = this.words[i].id

      }

    }
  }

  run() {

    for (var i = this.words.length - 1; i >= 0; i--) {
      var w = this.words[i];


      w.show();
      w.move();
      w.grow();
      w.white();

      if(w.id == this.dragId) {
        w.drag();
      }

      // If the word status is dead, out of the canvas, deleted it from the array
      if (w.kill()) {
        this.words.splice(i, 1);
      }

    }

  }


}
