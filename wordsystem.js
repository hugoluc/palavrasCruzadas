//Source words
var selectedWord;

class WordSystem {

  

  constructor(position,_data) {
  
    this.firstWordsDone = false
  
    //Array of words in the words system
    this.createWordTime = {
      min : 200,
      max : 800
    }
    this.data = _data
    this.words = []
    this.displayWords = []
    this.allWords = {}
    this.origin = position.copy();
    this.wordId = 0
    this.dataIndex = []
    
    this.genereteDataIndex()
    
    shuffleArray(this.dataIndex)

    this.clearDrag();
    this.wordLimit = CONTROLS.maxWodCount
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

      this.nextWordTime = getRandomInt(realWordTimes.wordTimeMax - realWordTimes.wordTimeMin) + realWordTimes.wordTimeMin
      this.lastMillis = millis()

      if(this.wordCount < this.wordLimit){
        this.getNewWord()
      }

    }
  }

  getFirstWords(){

    if(this.firstWordsDone) return


    if( realWordTimes.wordTimeMax >= 4000 ){
      realWordTimes.wordTimeMax = 4000
    }
    
    if( realWordTimes.wordTimeMin >= 3000 ){
      realWordTimes.wordTimeMin = 3000
    }

    if(realWordTimes.wordTimeMin == 3000 &&  realWordTimes.wordTimeMax >= 4000){

      this.firstWordsDone = true
      return

    }else{

      realWordTimes.wordTimeMin = realWordTimes.wordTimeMin + 100
      realWordTimes.wordTimeMax = realWordTimes.wordTimeMax + 100

    }


  }

  genereteDataIndex(){
    
    if(this.dataIndex.length <= 0){
        
      for(var i = 0; i < this.data.palavras.length; i++){ 
        this.dataIndex.push(i) 
      }

    }

    shuffleArray(this.dataIndex)

  }


  getNewWord(){
    
    //Select the word from the source
    var selectedWord = this.words.pop()

    var index = this.dataIndex.pop()
    var data = this.data.palavras[index]
    
    this.genereteDataIndex()

    selectedWord.setData(data);

    //Pass it to the Word class constructor
    this.displayWords.push(selectedWord);
    this.wordCount++

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

    this.getFirstWords()

    this.addWord()

    for (var i = this.displayWords.length - 1; i >= 0; i--) {
      var w = this.displayWords[i];

      w.toHover();
      w.toNotHover();
      w.move();
      w.grow();
      w.show();

      if(w.id == this.dragId) {
        w.drag();
      }

      // If the word status is dead, out of the canvas, deleted it from the array
      if (w.kill()) {

        this.words.push( this.displayWords.splice(i, 1)[0] );
        this.wordCount--

      }

    }
  }

  firstDraw(){
    

    var timeInterval = 100
    var wordLimit = 20

    for (var j = 0; j < wordLimit; j++) {    

      this.getNewWord()

      for (var l = 0; l < timeInterval; l++) {
      
        for (var i = this.displayWords.length - 1; i >= 0; i--) {
          var w = this.displayWords[i];
          
          w.move();
          w.grow();
        
        }
    
      }
    }

    return false

  }
  
}