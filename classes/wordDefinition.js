
function wordDefinition(){

  this.tempoPorCaracter = 0

  this.margin = canvasSize.height * 0.08
  this.allContainer = document.createElement("div")
  this.allContainer.style.position = "absolute"
  this.allContainer.style.top = "0px"
  this.allContainer.style.bottom = "0px"
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
  this.word.style.fontSize = canvasSize.height * 0.09 + "px"
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
  this.audio = document.createElement("audio")
  this.container.append(this.audio)
  this.reset()

}

wordDefinition.prototype.init = function(_data, _callBack) {

  //setting callback and time per caracter
  this.callBack = () => { _callBack() }
  this.data = _data


  this.data.audioObj.play()

  //setting text for content
  this.word.innerHTML = _data.palavra
  this.description.innerHTML = _data.significado
  this.transWord.innerHTML = _data.tradução
  this.transDescription.innerHTML = _data.significadoOriginal
  this.secondTitle.innerHTML = "Em " + _data.origem

  //initiating animations
  this.firstTitle.style.transform = "translateX(0px)"
  this.firstTitle.style.opacity = 1

  this.container.style.transform = "translateX(0px)"
  this.container.style.opacity = 1

  this.line.style.width = canvasSize.width - (2*this.margin) + "px"

  //calling callBack after animation
  var time = ( this.description.innerHTML.length + this.firstTitle.innerHTML.length + this.word.innerHTML.length) * this.tempoPorCaracter
  setTimeout( () => { this.changeToTrans(_data) }, time + 1000)

}

wordDefinition.prototype.changeToTrans = function(_data) {
  var time = ( this.transDescription.innerHTML.length + this.secondTitle.innerHTML.length + this.transWord.innerHTML.length) * this.tempoPorCaracter
  _data.audioOriginalObj.play()
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

  setTimeout( () => { this.finish() }, time + 1000)

}

wordDefinition.prototype.finish = function(_data) {

  this.secondTitle.style.opacity = 0
  this.line.style.opacity = 0
  this.transContainer.style.opacity = 0
  this.callBack()
  setTimeout( () => { this.reset() } , 2000 )

}

wordDefinition.prototype.reset = function(){

  this.firstTitle.style.transform = "translateX(-" + canvasSize.width * 0.05 + "px)"
  this.secondTitle.style.transform = "translateX(-" + canvasSize.width * 0.05 + "px)"

  this.container.style.transform = "translateX(-" + canvasSize.width * 0.05 + "px)"
  this.transContainer.style.transform = "translateX(-" + canvasSize.width * 0.05 + "px)"

  this.line.style.width = "0px"

}

wordDefinition.prototype.exitAnimation = function(){

}
