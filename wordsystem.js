//Source words
var selectedWord;

class WordSystem {

  constructor(position) {
    //Array of words in the words system
    this.words = []
    this.displayWords = []
    this.allWords = {}
    this.origin = position.copy();
    this.wordId = 0
    this.clearDrag();

    this.wordLimit = 10
    this.wordCount = 0

    for(var i = 0; i < this.wordLimit; i++){

      this.words.push(new Word(this.origin, this.wordId));
      this.allWords[this.wordId] = this.words[i]
      this.wordId++
    }

    this.millis = millis()
    this.lastMillis = 0
    this.nextWordTime = 0


  }

  addWord() {
    var elapsedTime = millis() - this.lastMillis

    if(elapsedTime > this.nextWordTime){

      this.nextWordTime = getRandomInt(2000,8000)
      this.lastMillis = millis()

      if(this.wordCount < this.wordLimit){

        //Select the word from the source
        var selectedWord = this.words.pop()
        selectedWord.setData(random(data.palavras));
        //Pass is to the Word class constructor
        this.displayWords.push(selectedWord);
        this.wordCount++
      }


    }
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

    for (var i = 0; i < this.displayWords.length; i++) {

      if(this.displayWords[i].checkClick()){

        this.dragId = this.displayWords[i].id
        this.displayWords[i].isBeingDragged = true
        return this.displayWords[i]
      }
    }

  }

  run() {

    this.addWord()

    for (var i = this.displayWords.length - 1; i >= 0; i--) {
      var w = this.displayWords[i];

      w.toHover();
      w.toNotHover();
      w.show();
      w.move();
      w.grow();
      w.white();

      if(w.id == this.dragId) {
        w.drag();
      }

      // If the word status is dead, out of the canvas, deleted it from the array
      if (w.kill()) {

        this.words.push( this.displayWords.splice(i, 1)[0] );
        this.wordCount--
        //
        // console.log("------------------");
        // console.log(this.words);
        // console.log(this.displayWords);

      }

    }

  }

}
