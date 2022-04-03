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

//-----------------------------------------------------------------
//abstart color change
inspectionBtn.prototype.setColorChange = function(_element,_color,_alpha){
  this.transitionToColor = true
  if(_alpha != undefined){
    _element.finalColor = [_color.r,_color.g,_color.b,_alpha]

  }else{
    _element.finalColor = [_color.r,_color.g,_color.b,_element.alpha]
  }

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

  if(
    _element.color[0] == _element.finalColor[0] &&
    _element.color[1] == _element.finalColor[1] &&
    _element.color[2] == _element.finalColor[2] &&
    _element.alpha == _element.finalColor[3]
  ){
    return true
  }else{

    _element.color[0] = this.transitionColorValue(_element.color[0],_element.finalColor[0])
    _element.color[1] = this.transitionColorValue(_element.color[1],_element.finalColor[1])
    _element.color[2] = this.transitionColorValue(_element.color[2],_element.finalColor[2])
    _element.alpha    = this.transitionColorValue(_element.alpha,   _element.finalColor[3],true)


    return false

  }


}
inspectionBtn.prototype.transitionColorValue = function(_current,_target,_alpha){

  var alphaSpeed = 0.2
  var colorSpeed = 30

  var diff = _target - _current
  var multiplyer = diff > 0 ? 1 : -1
  var speed = _alpha ? alphaSpeed * multiplyer :  colorSpeed * multiplyer

  if((Math.abs(diff) - Math.abs(speed)).toFixed(3) > 0){
    return _current + speed
  }else{
    return _target
  }

}


//-----------------------------------------------------------------
//change btn style for word selection
inspectionBtn.prototype.wordSelected = function(){

  this.setColorChange(this.text,    selectedStyleColors.system.selectedWord)
  this.setColorChange(this.outline, selectedStyleColors.system.selectedBtn)

}
inspectionBtn.prototype.wordReleased = function(){

  this.setColorChange(this.text,    selectedStyleColors.system.word)
  this.setColorChange(this.outline, selectedStyleColors.system.btn)
  this.setColorChange(this.fill,    selectedStyleColors.system.selectedBtn,0)

}


//-----------------------------------------------------------------
// change btn to hover style
inspectionBtn.prototype.checkHover = function(){

  //Determine if mouse is hovereing the word width
  if (mouseY > this.position.y) {
    this.setColorChange(this.text,    selectedStyleColors.system.hoverdBtn,1)
    this.setColorChange(this.fill,    selectedStyleColors.system.selectedBtn,1)
    return true;
  }else{
    this.setColorChange(this.text,    selectedStyleColors.system.selectedWord,1)
    this.setColorChange(this.fill,    selectedStyleColors.system.selectedBtn,0)
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

    this.text.string = this.selectedWord
    this.text.size = 100

  //transition to nothovered state
  }else{

    this.fontFamily = sohneBold
    this.text.string = "Arraste as palavras aqui"
    this.text.size = canvasSize.height * 0.03
    this.transtitionHover = false

  }

}


//-----------------------------------------------------------------
//transsition no next page
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
  if(!this.transitionToColor,this.transitionsDone.text && this.transitionsDone.x && this.transitionsDone.y && this.transitionsDone.height && this.transitionsDone.width){
    
    this.transtitionNextPage = false
    this.callBack()
  }

}


//-----------------------------------------------------------------
//return btn to original state
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
  this.init()

  this.text.alpha = 0
  this.outline.alpha = 0

  this.setColorChange(this.text,    selectedStyleColors.system.word,1)
  this.setColorChange(this.outline, selectedStyleColors.system.btn,1)
  // this.setColorChange(this.fill,    selectedStyleColors.system.btn,0)

}


//-----------------------------------------------------------------
inspectionBtn.prototype.init = function(){

  this.transitionToColor= false
  this.changeToBlack = true
  this.transitionToNormal = false
  this.fontFamily = sohneBold
  this.color = [selectedStyleColors.system.word.r,selectedStyleColors.system.word.g,selectedStyleColors.system.word.b]
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
    color : [selectedStyleColors.system.btn.r,selectedStyleColors.system.btn.g,selectedStyleColors.system.btn.b],
    finalColor : [selectedStyleColors.system.btn.r,selectedStyleColors.system.btn.g,selectedStyleColors.system.btn.b,1],
    alpha : 1
  }

  this.fill = {
    name: "fill",
    color : [selectedStyleColors.system.selectedBtn.r,selectedStyleColors.system.selectedBtn.g,selectedStyleColors.system.selectedBtn.b],
    finalColor : [selectedStyleColors.system.selectedBtn.r,selectedStyleColors.system.selectedBtn.g,selectedStyleColors.system.selectedBtn.b,0],
    alpha : 0
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
inspectionBtn.prototype.show = function(){

  //handle hover animation
  if(this.transtitionHover ){ this.displayHover(this.isHovered) }
  if(this.transtitionNextPage ){ this.dislayNextPage() }
  if(this.transitionToColor){ this.displayChangeColor() }
  if(this.transitionToNormal){ this.displayToNormal() }

  //display bg
  fill(selectedStyleColors.system.bg.r,selectedStyleColors.system.bg.g,selectedStyleColors.system.bg.b)
  rect(0, this.position.y - this.marginTop, this.size.width + (2*this.margin), this.size.height + this.margin + this.marginTop )


  //display outline
  stroke("rgba(" + this.outline.color[0] + "," + this.outline.color[1] + "," + this.outline.color[2] + "," + this.outline.alpha + ")")
  strokeWeight(10);
  noFill()
  rect(this.position.x, this.position.y,this.size.width, this.size.height)
  noStroke()

  //display fill
  fill( "rgba(" + this.fill.color[0] + "," + this.fill.color[1] + "," + this.fill.color[2] + "," + this.fill.alpha + ")")
  rect(this.position.x, this.position.y,this.size.width, this.size.height)
  noStroke()

  //display text
  textFont(this.fontFamily)
  textSize(this.text.size);
  fill( "rgba(" + this.text.color[0] + "," + this.text.color[1] + "," + this.text.color[2] + "," + this.text.alpha + ")")
  textAlign(CENTER)
  text(this.text.string, canvasSize.width/2, this.position.y + this.size.height/2 + (this.text.size/4));

}
