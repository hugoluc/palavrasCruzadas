function inspectionBtn(){

  this.margin = 25

  this.init()

}

inspectionBtn.prototype.toBlack = function(_callBack,_data){
  this.transitionToBlack= true
}

inspectionBtn.prototype.displayToBlack = function(_callBack,_data){

  if ( this.yellow[0] - 5 > 25 ){
    this.yellow[0] = this.yellow[0] - 10
  }else{
    this.yellow[0] = 25
  }

  if ( this.yellow[1] - 5 > 25 ){
    this.yellow[1] = this.yellow[1] - 10
  }else{
    this.yellow[1] = 25
  }

  if ( this.yellow[2] - 5 > 25 ){
    this.yellow[2] = this.yellow[2] - 10
  }else{
    this.yellow[2] = 25
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
    this.transtitionsDone.height = true
  }

  //transition width
  if(this.size.width < canvasSize.width){
    this.size.width = this.size.width + (2 * this.speed )
  }else{
    this.size.width = canvasSize.width
    this.transtitionsDone.width = true
  }

  //transition y position
  if(this.position.y - (this.speed *  this.acceleration ) > 0 ){
      this.position.y = this.position.y - this.speed
  }else{
    this.position.y =0
    this.transtitionsDone.y = true
  }

  //transition x position
  if(this.position.x > 0 ){
      this.position.x = this.position.x - this.speed
  }else{
    this.position.x =0
    this.transtitionsDone.x = true
  }

  //transition alpha
  if(this.text.alpha > 0){
    this.text.alpha = this.text.alpha - 0.08
  }else{
    this.text.string = ""
    this.transtitionsDone.text = true

  }

  //stop transition when finished and call callback function to change to next page
  if(this.transtitionsDone.text && this.transtitionsDone.x && this.transtitionsDone.y && this.transtitionsDone.height && this.transtitionsDone.width){
    this.transtitionNextPage = false
    this.callBack()
  }

}

inspectionBtn.prototype.checkHover = function(){

  //Determine if mouse is hovereing the word width
  if (mouseY > this.position.y) {

    return true;

  }else{

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

    if(this.alpha < 1){
      this.alpha = this.alpha + 0.08
      if(this.alpha > 0.8){
        this.text.string = this.selectedWord
        this.text.color = [1,1,1]
        // this.text.size = 38
      }
    }

  //transition to nothovered state
  }else{
    if(this.alpha > 0){
      this.alpha = this.alpha - 0.08
      if(this.alpha < 0.8){
        this.text.string = "Arraste as palavras aqui"
        this.text.color =  this.yellow
        this.text.size = canvasSize.height * 0.03
      }
      if(this.alpha < 0){
        this.transtitionHover = false
        this.alpha = 0
      }
    }
  }

}

inspectionBtn.prototype.show = function(){

  //handle hover animation
  if(this.transtitionHover ){ this.displayHover(this.isHovered) }
  if(this.transtitionNextPage ){ this.dislayNextPage() }
  if(this.transitionToBlack){ this.displayToBlack() }

  //display bg
  strokeWeight(4);
  fill(globalColors.gray.r,globalColors.gray.g,globalColors.gray.b)
  rect(0, this.position.y - this.margin, this.size.width + (2*this.margin), this.size.height + (2*this.margin) )

  //display outline
  stroke(this.yellow[0],this.yellow[1],this.yellow[2]);
  strokeWeight(4);
  noFill()
  rect(this.position.x, this.position.y,this.size.width, this.size.height)
  noStroke()

  //display fill
  fill( "rgba(" + this.yellow[0] + "," + this.yellow[1] + "," + this.yellow[2] + "," + this.alpha + ")")
  rect(this.position.x, this.position.y,this.size.width, this.size.height)
  noStroke()

  //display text
  textSize(this.text.size);
  fill( "rgba(" + this.text.color[0] + "," + this.text.color[1] + "," + this.text.color[2] + "," + this.text.alpha + ")")
  textAlign(CENTER)
  text(this.text.string, canvasSize.width/2, this.position.y + this.size.height/2 + (this.text.size/4));

}

inspectionBtn.prototype.init = function(){

  this.yellow = [globalColors.yellow.r,globalColors.yellow.g,globalColors.yellow.b]   
  this.transtitionHover = false
  this.transtitionNextPage = false
  this.transitionToBlack= false
  this.isHovered = false
  this.transtitionsDone = {
    height : false,
    width : false,
    x : false,
    y : false,
  }


  this.alpha = 0
  this.text = {
    size : canvasSize.height * 0.03,
    string : "Arraste as palavras aqui",
    color : this.yellow,
    alpha : 1
  }

  this.size = {
    width : canvasSize.width - (2*this.margin),
    height : canvasSize.height * 0.121
  }

  this.speed = canvasSize.height * 0.01
  this.acceleration = 1.1
  this.position = {
    x : this.margin,
    y : canvasSize.height - this.size.height -   this.margin,
  }

}
