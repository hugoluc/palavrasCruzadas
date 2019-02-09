class Word {

  constructor(position, id) {
    //initial selected position and direction it moves
    this.originalPosition = position.copy();
    this.id = id;
    this.speedLimits = {
      min : 0.5,
      max : 2
    }

    this.reset();

  }

  setData(_data){
    this.data = _data
    this.word = _data.palavra;
    this.textWidth = textWidth(this.word)
    this.isDisplayed = true
    this.reset();
  }

  reset(){
    this.location = this.originalPosition.copy()
    this.size = 10;
    this.r = 24;
    this.g = 24;
    this.b = 24;
    this.a = 255;
    this.isBeingDragged = false
    this.isTooBig = false
    this.totalSpeed = random(CONTROLS.speedMin, CONTROLS.speedMax)
    var angle = getRandomInt(361)
    var speedX = Math.cos(toRadians(angle)) * this.totalSpeed
    var speedY =  Math.sin(toRadians(angle)) * this.totalSpeed
    this.speed = createVector(speedX, speedY);
    this.speedCounter = 0
    this.pastMouseLocation = {
      x : 0,
      y : 0
    }
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

  setHover(_hover){
    this.hover = _hover
  }

  toHover(){

    if(this.a > 0 & this.hover){
      this.a =- 10
    }

  }

  toNotHover(){

    if(this.a < 255 & !this.hover ){
      this.a = this.a + 10
    }

  }

  move() {

    //Move Words
    this.location.add(this.speed)

  }

  grow() {
    // Grow Words
    if (this.isBeingDragged) {
      this.size = this.size;
    } else {
      this.size = this.size + (this.totalSpeed * CONTROLS.growMultiplyer);
      this.r = map(this.size,0,100,0,255,true)
      this.g = map(this.size,0,100,0,255,true)
      this.b = map(this.size,0,100,0,255,true)
      if (this.size > 150) this.isTooBig = true
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
    if(this.isBeingDragged) return false
    if(this.isTooBig) return true

    if (this.location.x > width || this.location.x < 0|| this.location.y > height - btn.getTotalHeight() || this.location.y < 0 && this.isBeingDragged ){
      return true;
      this.isDisplayed = false
    }else{
      return false;
    };


  }

  show() {

    if (!this.isDisplayed) return

    // console.log(this.r,this.g,this.b);
    // console.log("------------");
    fill(this.r, this.g,this.b,this.a);
    textSize(this.size);
    textFont(sohneBold)
    this.textWidth = textWidth(this.word)
    text(this.word, this.location.x, this.location.y);

  }

  getNewSpeed() {

    // console.log(this.location,this.pastMouseLocation);
    var speedX = (this.location.x - this.pastMouseLocation.x) * 0.1
    var speedY = (this.location.y - this.pastMouseLocation.y) * 0.1
    this.speed = createVector(speedX, speedY);

  }

  setPastSpeed() {
    this.pastMouseLocation = createVector(this.location.x,this.location.y)
  }


}
