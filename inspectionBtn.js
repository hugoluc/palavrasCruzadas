function inspectionBtn(){

  this.yellow = [globalColors.yellow.r,globalColors.yellow.g,globalColors.yellow.b]
  this.margin = 25
  this.size = {
    width : canvasSize.width - (2*this.margin),
    height : 75
  }
  this.position = {
    x :   this.margin,
    y : canvasSize.height - this.size.height -   this.margin,
  }

  this.text = {
    size : 18,
    string : "Arraste as palavras aqui",
    color : this.yellow
  }

  this.alpha = 0
  this.isHovered = false
  this.transtitionHover = false

}

inspectionBtn.prototype.nextPage = function(){

    this.transtitionNextPage = true
    this.speed = 1
    this.acceleration = 1
    this.transtitionsDone = {
      height : false,
      width : false,
      x : false,
      y : false,
    }
}

inspectionBtn.prototype.dislayNextPage = function(){

  this.acceleration++

  //transition height
  if(this.size.height < canvasSize.height){
    this.size.height = this.size.height + (2 * (this.speed + this.acceleration))
  }else{
    this.size.height = canvasSize.height
    this.transtitionsDone.height = true
  }

  //transition width
  if(this.size.width < canvasSize.width){
    this.size.width = this.size.width + (2 * (this.speed + this.acceleration))
  }else{
    this.size.width = canvasSize.width
    this.transtitionsDone.width = true
  }

  if(this.position.y > 0 ){
      this.position.y = this.position.y - this.speed -  this.acceleration
  }else{
    this.position.y =0
    this.transtitionsDone.y = true
  }

  if(this.position.x > 0 ){
      this.position.x = this.position.x - this.speed -  this.acceleration
  }else{
    this.position.x =0
    this.transtitionsDone.x = true
  }

    if(this.alpha < 1){
      this.alpha = this.alpha + 0.08
      if(this.alpha > 0.8){
        this.text.string = ""
    }
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
        this.text.color = [0,0,0]
        this.text.size = 38
      }
    }

  //transition to nothovered state
  }else{
    if(this.alpha > 0){
      this.alpha = this.alpha - 0.08
      if(this.alpha < 0.8){
        this.text.string = "Arraste as palavras aqui"
        this.text.color =  this.yellow
        this.text.size = 18
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
  fill(this.text.color[0],this.text.color[1],this.text.color[2])
  textAlign(CENTER)
  text(this.text.string, canvasSize.width/2, this.position.y + this.size.height/2 + (this.text.size/4));

}
