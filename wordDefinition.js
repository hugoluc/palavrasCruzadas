
function wordDefinition(){

  this.margin = canvasSize.height * 0.08

  //titles

  this.firstTitle = document.createElement("div")
  this.firstTitle.className = "wordexplorer title"
  this.firstTitle.innerHTML = "Em Português"
  this.firstTitle.style.left = this.margin + "px"
  this.firstTitle.style.top = this.margin + "px"
  this.firstTitle.style.fontSize = canvasSize.height * 0.028 + "px"
  document.body.append(this.firstTitle)

  this.secondTitle = this.firstTitle.cloneNode(true)
  document.body.append(this.secondTitle)

  //line
  this.line = document.createElement("div")
  this.line.className = "wordexplorer line"
  this.line.style.height = "4px"
  this.line.style.background = "black"
  this.line.style.left = this.margin + "px"
  this.line.style.top = this.margin + canvasSize.height * 0.04  + "px"
  this.line.style.width = "0px"
  document.body.append(this.line)

  //containers
  this.container = document.createElement("div")
  this.container.className = "wordexplorer container"
  this.container.style.top = canvasSize.height * 0.113 + "px"
  this.container.style.width = canvasSize.width - (2*this.margin) + "px"
  this.container.style.left = this.margin + "px"
  this.container.style.marginTop = this.margin * 0.3 + "px"
  document.body.append(this.container)

  this.transContainer = this.container.cloneNode(true)
  this.transContainer.className = "wordexplorer container"
  document.body.append(this.transContainer)

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

}

var tempoPorCaracter = 75

wordDefinition.prototype.init = function(_data, _callBack) {


  this.callBack = () => { _callBack() }

  this.word.innerHTML = _data.palavra
  this.description.innerHTML = _data.significado

  this.transWord.innerHTML = _data.tradução
  this.transDescription.innerHTML = _data.significadoOriginal


  this.secondTitle.innerHTML = "Em " + _data.origem

  this.container.classList.add("on")
  this.firstTitle .classList.add("on")

  this.line.style.width = canvasSize.width - (2*this.margin) + "px"

  var time = ( this.description.innerHTML.length + this.firstTitle.innerHTML.length + this.word.innerHTML.length) * tempoPorCaracter
  setTimeout( () => { this.changeToTrans() }, time + 1000)

}

wordDefinition.prototype.changeToTrans = function(_data) {

  var time = ( this.transDescription.innerHTML.length + this.secondTitle.innerHTML.length + this.transWord.innerHTML.length) * tempoPorCaracter

  this.container.classList.add("off")
  this.firstTitle .classList.add("off")

  setTimeout(() => {
    this.transContainer.classList.add("on")
    this.secondTitle .classList.add("on")
  },100)

  setTimeout( () => { this.finish() }, time + 1000)

}

wordDefinition.prototype.finish = function(_data) {

  this.transContainer.classList.add("off")
  this.secondTitle .classList.add("off")
  this.callBack()

}
