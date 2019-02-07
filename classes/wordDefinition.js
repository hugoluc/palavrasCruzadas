
function wordDefinition(){

  this.tempoPorCaracter = 0

  this.margin = canvasSize.height * 0.08
  this.allContainer = document.createElement("div")
  this.allContainer.style.position = "absolute"
  this.allContainer.style.top = "0px"
  this.allContainer.style.display = "none"
  this.allContainer.style.bottom = "0px"
  this.allContainer.style.color = "rgb("+globalColors.gray.r+","+globalColors.gray.g+","+globalColors.gray.b+")"
  this.allContainer.id = "definition_container"
  document.body.append(this.allContainer)

  //titles
  this.firstTitle = document.createElement("div")
  this.firstTitle.className = "wordexplorer title"
  this.firstTitle.innerHTML = "Em Português"
  this.firstTitle.style.left = this.margin + "px"
  this.firstTitle.style.top = this.margin + "px"
  this.firstTitle.style.width = canvasSize.width - (2*this.margin) + "px"
  this.firstTitle.style.fontSize = canvasSize.height * 0.028 + "px"
  this.allContainer.append(this.firstTitle)

  this.secondTitle = this.firstTitle.cloneNode(true)
  this.allContainer.append(this.secondTitle)

  //line
  this.line = document.createElement("div")
  this.line.className = "wordexplorer line"
  this.line.style.height = "4px"
  this.line.style.background = "black"
  this.line.style.left = this.margin + "px"
  this.line.style.top = this.margin + canvasSize.height * 0.04  + "px"
  this.line.style.width = "0px"
  this.allContainer.append(this.line)

  //containers
  this.container = document.createElement("div")
  this.container.className = "wordexplorer container"
  this.container.style.top = canvasSize.height * 0.113 + "px"
  this.container.style.width = canvasSize.width - (2*this.margin) + "px"
  this.container.style.left = this.margin + "px"
  this.container.style.marginTop = this.margin * 0.3 + "px"
  this.allContainer.append(this.container)

  this.transContainer = this.container.cloneNode(true)
  this.transContainer.className = "wordexplorer container"
  this.allContainer.append(this.transContainer)

  //words
  this.word = document.createElement("div")
  this.word.className = "wordexplorer word"
  this.word.style.fontSize = "12vw"
  this.container.append(this.word)

  this.transWord = this.word.cloneNode(true)
  this.transContainer.append(this.transWord)

  //descriptions
  this.description = document.createElement("div")
  this.description.className = "wordexplorer description"
  this.description.style.fontSize = canvasSize.height * 0.04 + "px"
  this.container.append(this.description)

  this.transDescription = this.description.cloneNode(true)
  this.transContainer.append(this.transDescription)

  //audios
  // this.currentAudio = this.data.audioObj

  this.audio = document.getElementById("soud_icon").cloneNode(true)
  this.audio.style.display = "block"
  this.audio.style.position = "absolute"
  this.audio.style.width = "100px"
  this.audio.style.top =  this.margin + canvasSize.height * 0.08    + "px"
  this.audio.style.left = canvasSize.width - this.margin - 100 + "px"
  this.audio.style.marginTop = "200x"
  this.audio.style.opacity = 0
  this.audio.style.transform = "translateX(" - canvasSize.width * 0.05 +" )"

  this.audio.onclick = () => {
    this.playSound()
  }
  this.allContainer.append(this.audio)

  //forwardBtn
  this.forwardBtn = document.getElementById("back_icon").cloneNode(true)
  this.forwardBtn.style.transition = "opacity " + 1 + "s"
  this.forwardBtn.id = "forwardBtn"
  this.forwardBtn.style.display = "block"
  this.forwardBtn.style.height = "80px"
  this.forwardBtn.style.width =  "80px"
  this.forwardBtn.style.bottom =  this.margin + "px"
  this.forwardBtn.style.left =  canvasSize.width - this.margin - 80 + "px"
  this.forwardBtn.style.position =  "absolute"
  this.forwardBtn.style.transform =  "rotate(180deg)"
  this.forwardBtn.querySelector("#Path").setAttribute("stroke","rgb("+globalColors.gray.r+","+globalColors.gray.g+","+globalColors.gray.b+")")
  this.allContainer.appendChild(this.forwardBtn)

  this.reset()

}

wordDefinition.prototype.init = function(_data, _callBack) {

  console.log("word.init", _data);
  this.data = _data

  //setting callback and time per caracter
  this.callBack = () => { _callBack() }

  this.currentAudio = this.data.audioObj
  this.playSound()
  this.forwardBtn.onclick = () => {
    this.changeToTrans(_data)
  }

  //setting text for content
  this.setContent( this.word, _data.palavra)
  this.description.innerHTML = _data.significado
  this.setContent( this.transWord, _data.tradução)
  this.transDescription.innerHTML = _data.significadoOriginal
  this.secondTitle.innerHTML = "Em " + _data.origem


  this.allContainer.style.display = "block"
  setTimeout( () => {

    this.audio.style.opacity = 1
    this.audio.style.transform = "translateX(0)"

    //initiating animations
    this.firstTitle.style.transform = "translateX(0px)"
    this.firstTitle.style.opacity = 1

    this.container.style.transform = "translateX(0px)"
    this.container.style.opacity = 1

    this.line.style.width = canvasSize.width - (2*this.margin) + "px"

  }, 100 )

}

wordDefinition.prototype.changeToTrans = function(_data) {
  var time = ( this.transDescription.innerHTML.length + this.secondTitle.innerHTML.length + this.transWord.innerHTML.length) * this.tempoPorCaracter

  this.currentAudio = this.data.audioOriginalObj
  this.playSound()

  this.secondTitle.style.transform = "translateX(0px)"
  this.firstTitle.style.transform = "translateX(" + canvasSize.width * 0.05 + "px)"
  this.firstTitle.style.opacity = 0

  this.transContainer.style.transform = "translateX(0px)"
  this.container.style.transform = "translateX(" + (canvasSize.width * 0.05) + "px)"
  this.container.style.opacity = 0

  setTimeout(() => {
    this.transContainer.classList.add("on")
    this.secondTitle.classList.add("on")
  },100)


    this.forwardBtn.onclick = () => {
      this.nextPage( () => { this.finish(_data) } )
    }

}

wordDefinition.prototype.finish = function(_data) {

  this.secondTitle.style.opacity = 0
  this.line.style.opacity = 0
  this.transContainer.style.opacity = 0
  this.audio.style.opacity = 0
  this.callBack()
  setTimeout( () => { this.reset() } , 2000 )

}

wordDefinition.prototype.reset = function(){

  this.firstTitle.style.transform = "translateX(-" + canvasSize.width * 0.05 + "px)"
  this.secondTitle.style.transform = "translateX(-" + canvasSize.width * 0.05 + "px)"

  this.container.style.transform = "translateX(-" + canvasSize.width * 0.05 + "px)"
  this.transContainer.style.transform = "translateX(-" + canvasSize.width * 0.05 + "px)"

  this.line.style.width = "0px"
  this.allContainer.style.display = "none"

}

wordDefinition.prototype.exitAnimation = function(){

}

wordDefinition.prototype.setContent = function(_DOM,_string){

  var size = (1 / _string.length ) * 1100
  size = size > 140 ? 140 : size
  _DOM.innerHTML = _string
  _DOM.style.fontSize = size + "px"

}

wordDefinition.prototype.playSound = function(){
  if(!this.currentAudio.isPlaying()){
    this.currentAudio.play()
  }

  this.currentAudio._onended = () => { this.playEnd() }

  this.forwardBtn.style.opacity = 0.1
this.audio.querySelector("#soundWavesIcon").setAttribute("opacity","1")

}

wordDefinition.prototype.playEnd = function(){
  if(!this.currentAudio.isPlaying()){
    this.currentAudio.stop()
  }
  this.audio.querySelector("#soundWavesIcon").setAttribute("opacity","0.1")
  this.forwardBtn.style.opacity = 1

}

wordDefinition.prototype.nextPage = function(_func){
  if(!this.currentAudio.isPlaying()){
      _func()
  }
}
