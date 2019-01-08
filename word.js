class Word {

  constructor(tempWord, position) {
    //initial selected position and direction it moves
    this.location = position.copy();
    this.speed = createVector(random(-0.8, 0.8), random(-0.8, 0.8));

    //Word, color, size
    this.size = 10;
    this.r = 24;
    this.g = 24;
    this.b = 24;
    this.word = tempWord;
  }



  move() {

    //Move Words
    this.location.add(this.speed)

  }

  white() {
    //whitening Words
    //Calculate the distance between the initial to final location
    var d = dist(180, 260, this.location.x, this.location.y);
    this.r = map(d, 0, 50, 24, 216);
    this.g = map(d, 0, 50, 24, 216)
    this.b = map(d, 0, 50, 24, 216)
  }

  grow() {
    //Grow Words
    if (mouseIsPressed) {
      this.size = this.size;
    } else {
      this.size = this.size + 0.1;
    }
  }

  drag() {

    //Calculate the distance between the mouse and word location
    var d = dist(mouseX, mouseY, this.location.x, this.location.y);
    //Calculate the word width
    var wordString = this.word;
    var wordWidth = textWidth(wordString);
    //Determine if mouse is hovereing the word width
    if (d < wordWidth) {
      //Word hover - print "DRAG WORD"
      //print("DRAG WORD");

      // Word drag
      if (mouseIsPressed) {
        this.location.x = mouseX;
        this.location.y = mouseY;
        this.r = 254;
        this.g = 241;
        this.b = 2;
      } else {
        this.r = 216;
        this.g = 216;
        this.b = 216;
      }
    }


  }

  kill() {

    //When the words leave the canvas return "Kill it"

    if (this.location.x > width || this.location.x < 0|| this.location.y > height || this.location.y < 0){
      return true;
    }else{
      return false;
    };


  }

  show() {
    //display the word
    fill(this.r, this.g,this.b,);
    textSize(this.size);
    text(this.word, this.location.x, this.location.y);

  }

}
