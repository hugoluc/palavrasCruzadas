class Word {

  constructor(_data, position, id) {
    //initial selected position and direction it moves
    this.location = position.copy();
    this.speed = createVector(random(-0.8, 0.8), random(-0.8, 0.8));
    this.id = id;
    this.data = _data

    //Word, color, size
    this.size = 10;
    this.r = 24;
    this.g = 24;
    this.b = 24;
    this.word = _data.palavra;
    this.textWidth = textWidth(this.word)
    this.isBeingDragged = false

  }

  checkClick(){

    //Calculate the distance between the mouse and word location
    var d = dist(mouseX, mouseY, this.location.x, this.location.y);

    var wordPositions = {
      x : {
        start : this.location.x - (this.textWidth/2),
        end : this.location.x + this.textWidth - (this.textWidth/2)
      },
      y : {
        start : this.location.y - (this.size * 0.75),
        end : this.location.y
      }
    }

    if (mouseX > wordPositions.x.start && mouseX < wordPositions.x.end && mouseY > wordPositions.y.start && mouseY < wordPositions.y.end){
      this.isBeingDragged = true
      return true
    }else{
      return false
    }

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
    // Grow Words
    if (this.isBeingDragged) {
      this.size = this.size;
    } else {
      this.size = this.size + 0.1;
    }
  }

  drag() {

    this.location.x = mouseX;
    this.location.y = mouseY;
    this.r = 254;
    this.g = 241;
    this.b = 2;

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
    this.textWidth = textWidth(this.word)
    text(this.word, this.location.x, this.location.y);

  }

}
