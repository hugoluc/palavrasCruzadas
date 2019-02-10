function inspectionBtn(){

  this.margin = 100
  this.marginTop= 30
  this.constants = {
    height :  canvasSize.height * 0.121,
    width :  canvasSize.width - (2 * this.margin),
    size : canvasSize.height * 0.03,
    string : "Arraste as palavras aqui",
    color : [globalColors.yellow.r,globalColors.yellow.g,globalColors.yellow.b],
    alpha : 1,
    speed : canvasSize.height * 0.01,
  }
  this.constants.x = this.margin,
  this.constants.y = canvasSize.height - this.constants.height - this.margin,
  this.init()

}

inspectionBtn.prototype.setColorChange = function(_color){
  this.transitionToColor= true
  this.changeToBlack = _color
}

inspectionBtn.prototype.changeColor = function(){

  var speed = 10
  var finalColor = this.changeToBlack ? [25,25,25]: this.constants.color

  this.color[0] = this.color[0] - speed > finalColor[0] ? this.color[0] - speed : this.color[0] = finalColor[0]
  this.color[1] = this.color[1] - speed > finalColor[1] ? this.color[1] - speed : this.color[1] = finalColor[1]
  this.color[2] = this.color[2] - speed > finalColor[2] ? this.color[2] - speed : this.color[2] = finalColor[2]

}

inspectionBtn.prototype.nextPage = function(_callBack,_data){

    console.log("nextPage");
    this.callBack = _callBack
    this.transtitionNextPage = true

}

inspectionBtn.prototype.dislayNextPage = function(){

  this.speed = this.speed * this.acceleration

  //transition height
  if(this.size.height < canvasSize.height){
    this.size.height = this.size.height + (2 * this.speed )
  }else{
    this.size.height = canvasSize.height
    this.transitionsDone.height = true
  }

  //transition width
  if(this.size.width < canvasSize.width){
    this.size.width = this.size.width + (2 * this.speed )
  }else{
    this.size.width = canvasSize.width
    this.transitionsDone.width = true
  }

  //transition y position
  if(this.position.y - (this.speed *  this.acceleration ) > 0 ){
      this.position.y = this.position.y - this.speed
  }else{
    this.position.y =0
    this.transitionsDone.y = true
  }

  //transition x position
  if(this.position.x > 0 ){
      this.position.x = this.position.x - this.speed
  }else{
    this.position.x =0
    this.transitionsDone.x = true
  }

  //transition alpha
  if(this.text.alpha > 0){
    this.text.alpha = this.text.alpha - 0.08
  }else{
    this.text.string = ""
    this.transitionsDone.text = true

  }

  //stop transition when finished and call callback function to change to next page
  if(this.transitionsDone.text && this.transitionsDone.x && this.transitionsDone.y && this.transitionsDone.height && this.transitionsDone.width){
    this.transtitionNextPage = false
    this.callBack()
  }

}

inspectionBtn.prototype.checkHover = function(){

  //Determine if mouse is hovereing the word width
  if (mouseY > this.position.y) {
    return true;
  }else{    return false

  }
}

inspectionBtn.prototype.setHover = function(_isHovered, _selectedWord){
  this.isHovered = _isHovered
  this.selectedWord = _selectedWord
  this.transtitionHover = true

}

inspectionBtn.prototype.displayHover = function(_isHovered){

  //transition to hovered state
  if(_isHovered){
    this.fontFamily = sohneBold
    if(this.alpha < 1){
      this.alpha = this.alpha + 0.08
      if(this.alpha > 0.8){
        this.text.string = this.selectedWord
        this.text.color = [1,1,1]
        this.text.size = 100
      }
    }

  //transition to nothovered state
  }else{
    this.fontFamily = sohneBold
    if(this.alpha > 0){
      this.alpha = this.alpha - 0.08
      if(this.alpha < 0.8){
        this.text.string = "Arraste as palavras aqui"
        this.text.color =  this.color
        this.text.size = canvasSize.height * 0.03
      }
      if(this.alpha < 0){
        this.transtitionHover = false
        this.alpha = 0
      }
    }
  }

}

inspectionBtn.prototype.init = function(){

  this.transitionToColor= false
  this.changeToBlack = true
  this.transitionToNormal = false
  this.fontFamily = sohneBold
  this.color = [globalColors.yellow.r,globalColors.yellow.g,globalColors.yellow.b]
  this.transtitionHover = false
  this.transtitionNextPage = false
  this.transitionToBlack= false
  this.isHovered = false
  this.transitionsDone = {
    height : false,
    width : false,
    x : false,
    y : false,
  }

  this.alpha = 0
  this.text = {
    size : this.constants.size,
    string : this.constants.string,
    color : this.constants.color,
    alpha : this.constants.alpha
  }

  this.size = {
    width : this.constants.width,
    height : this.constants.height
  }

  this.speed = this.constants.speed
  this.acceleration = 1.1
  this.position = {
    x : this.constants.x,
    y : this.constants.y,
  }

}

inspectionBtn.prototype.getTotalHeight = function(){

  return  this.margin +  this.size.height + this.marginTop

}

inspectionBtn.prototype.setReturn = function(){
  enableCanvas = true
  toDefinition = false
  menu.reset()
  this.setHover(false)
  this.transitionToNormal = true
  this.speed = this.constants.speed * -0.4
  this.alpha = 0
  this.text.string = this.constants.string
  this.text.size = this.constants.size

}

inspectionBtn.prototype.displayToNormal = function(){

  this.speed = this.speed * 0.97

  //transition height
  if(this.size.height < this.constants.height){
    this.size.height = this.size.height +  this.speed
  }else{
    this.size.height = this.constants.height
    this.transitionsDone.height = false
  }

  //transition width
  if(this.size.width > this.constants.width){
    this.size.width = this.size.width + (this.speed * 2)
  }else{
    this.size.width = this.constants.width
    this.transitionsDone.width = false
  }

  //transition y position
  if(this.position.y - (10 * this.speed) < this.constants.y ){
      this.position.y = this.position.y - (10 * this.speed)
  }else{
    this.position.y = this.constants.y
    this.transitionsDone.y = false
  }

  //transition x position
  if(this.position.x < this.constants.x ){
      this.position.x = this.position.x - this.speed
  }else{
    this.position.x = this.constants.x
    this.transitionsDone.x = false
  }

  // transition alpha
  if(this.text.alpha < 1){
    this.text.alpha = this.text.alpha + 0.05
  }else{
    this.transitionsDone.text = false
  }

  // stop transition when finished and call callback function to change to next page
  if(!this.transitionsDone.text && !this.transitionsDone.x && !this.transitionsDone.y && !this.transitionsDone.height && !this.transitionsDone.width){
    this.init()
  }

}

inspectionBtn.prototype.show = function(){

  //handle hover animation
  if(this.transtitionHover ){ this.displayHover(this.isHovered) }
  if(this.transtitionNextPage ){ this.dislayNextPage() }
  if(this.transitionToColor){ this.changeColor() }
  if(this.transitionToNormal){ this.displayToNormal() }

  //display bg
  fill(globalColors.gray.r,globalColors.gray.g,globalColors.gray.b)
  rect(0, this.position.y - this.marginTop, this.size.width + (2*this.margin), this.size.height + this.margin + this.marginTop )


  //display outline
  stroke(this.color[0],this.color[1],this.color[2]);
  strokeWeight(10);
  noFill()
  rect(this.position.x, this.position.y,this.size.width, this.size.height)
  noStroke()

  //display fill
  fill( "rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + "," + this.alpha + ")")
  rect(this.position.x, this.position.y,this.size.width, this.size.height)
  noStroke()

  //display text
  textFont(this.fontFamily)
  textSize(this.text.size);
  fill( "rgba(" + this.text.color[0] + "," + this.text.color[1] + "," + this.text.color[2] + "," + this.text.alpha + ")")
  textAlign(CENTER)
  text(this.text.string, canvasSize.width/2, this.position.y + this.size.height/2 + (this.text.size/4));

}
