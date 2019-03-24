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

inspectionBtn.prototype.setColorChange = function(_element,_color){

  this.transitionToColor = true
  _element.finalColor = [_color.r,_color.g,_color.b]

}

inspectionBtn.prototype.displayChangeColor = function(){

  var text = this.changeColor(this.text)
  var outline = this.changeColor(this.outline)
  var fill = this.changeColor(this.fill)


  if( text && outline && fill){
    this.transitionToColor = false
  }

}

inspectionBtn.prototype.changeColor = function(_element){
  // console.log("--------------");
  // console.log(_element.name);
  // console.log(_element.color);
  // console.log(_element.finalColor);


  if(
    _element.color[0] == _element.finalColor[0] &&
    _element.color[1] == _element.finalColor[1] &&
    _element.color[2] == _element.finalColor[2]
  ){
    return true
  }else{

    // console.log("before:", _element.color);

    var diff = _element.finalColor[0] - _element.color[0]
    var multiplyer = diff > 0 ? 1 : -1
    var speed = 10 * multiplyer
    if(Math.abs(diff) + speed > 0){
      _element.color[0] =  _element.color[0] + speed
    }else{
      _element.color[0] =  _element.finalColor[0]
    }

    diff = _element.finalColor[1] - _element.color[1]
    multiplyer = diff > 0 ? 1 : -1
    speed = 10 * multiplyer
    if(Math.abs(diff) + speed > 0){
      _element.color[1] =  _element.color[1] + speed
    }else{
      _element.color[1] =  _element.finalColor[1]
    }

    diff = _element.finalColor[2] - _element.color[2]
    multiplyer = diff > 0 ? 1 : -1
    speed = 10 * multiplyer
    if(Math.abs(diff) + speed > 0){
      _element.color[2] =  _element.color[2] + speed
    }else{
      _element.color[2] =  _element.finalColor[2]
    }

    return false

  }


}

inspectionBtn.prototype.nextPage = function(_callBack,_data){

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
  if(this.text.alpha - 0.08 > 0){
    this.text.alpha = this.text.alpha - 0.08
  }else{
    this.text.string = ""
    this.text.alpha = 0
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
    this.setColorChange(this.text,globalColors.gray)
    return true;
  }else{
    this.setColorChange(this.text,globalColors.yellow)
    return false
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
  this.color = [globalColors.white.r,globalColors.white.g,globalColors.white.b]
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
  this.colorChangeElmements = []

  this.alpha = 0
  this.text = {
    name: "text",
    size : this.constants.size,
    string : this.constants.string,
    color : this.color,
    alpha : this.constants.alpha
  }

  this.outline = {
    name: "outline",
    color : [this.color[0],this.color[1],this.color[2]],
    finalColor : [this.color[0],this.color[1],this.color[2]],
  }

  this.fill = {
    name: "fill",
    color : [globalColors.yellow.r,globalColors.yellow.g,globalColors.yellow.b],
    finalColor : [globalColors.yellow.r,globalColors.yellow.g,globalColors.yellow.b],
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
  if(this.transitionToColor){ this.displayChangeColor() }
  if(this.transitionToNormal){ this.displayToNormal() }

  //display bg
  fill(globalColors.gray.r,globalColors.gray.g,globalColors.gray.b)
  rect(0, this.position.y - this.marginTop, this.size.width + (2*this.margin), this.size.height + this.margin + this.marginTop )


  //display outline
  stroke(this.outline.color[0],this.outline.color[1],this.outline.color[2]);
  strokeWeight(10);
  noFill()
  rect(this.position.x, this.position.y,this.size.width, this.size.height)
  noStroke()

  //display fill
  fill( "rgba(" + this.fill.color[0] + "," + this.fill.color[1] + "," + this.fill.color[2] + "," + this.alpha + ")")
  rect(this.position.x, this.position.y,this.size.width, this.size.height)
  noStroke()

  //display text
  textFont(this.fontFamily)
  textSize(this.text.size);
  fill( "rgba(" + this.text.color[0] + "," + this.text.color[1] + "," + this.text.color[2] + "," + this.text.alpha + ")")
  textAlign(CENTER)
  text(this.text.string, canvasSize.width/2, this.position.y + this.size.height/2 + (this.text.size/4));

}
