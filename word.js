class Word {

  constructor(tempWord) {
    //initial selected word, position, size, color and speed
    this.x = 180;
    this.y = 260;
    this.size = 10;
    this.r = 24;
    this.g = 24;
    this.b = 24;
    this.speed = 0.05;
    this.word = tempWord;
  }



  move() {
    //Move Words
    this.x = this.x + this.speed;
    this.y = this.y + this.speed;

  }



  white() {
    //whitening Words
    //Calculate the distance between the initial to final location
    var d = dist(180, 260, this.x, this.y);
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
    var d = dist(mouseX, mouseY, this.x, this.y);
    //Calculate the word width
    var wordString = this.word;
    var wordWidth = textWidth(wordString);
    //Determine if mouse is hovereing the word width
    if (d < wordWidth) {
      //Word hover - print "DRAG WORD"
      // print("DRAG WORD");

      // Word drag
      if (mouseIsPressed) {
        this.x = mouseX;
        this.y = mouseY;
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
    //Delete words after a while - for now print DELETE WORD
    if (this.x > width + this.size) {
      // print("DELETE WORD")
    };

  }


  show() {
    //display the word
    fill(this.r, this.g,this.b,);
    textSize(this.size);
    text(this.word, this.x, this.y);

  }


}
