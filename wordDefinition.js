//btn.nextPage(definitionPage.init,jsonExample.pitanga)

function wordDefinition(){

  this.margin = 50

  //titles
  this.firstTitle = document.createElement("div")
  this.firstTitle.className = "wordexplorer title"
  this.firstTitle.innerHTML = "Em Português"
  this.firstTitle.style.left = this.margin + "px"
  document.body.append(this.firstTitle)

  this.secondTitle = document.createElement("div")
  this.secondTitle.className = "wordexplorer title"
  this.firstTitle.innerHTML = "Em Tupinambá"
  this.secondTitle.style.display = "none"
  document.body.append(this.secondTitle)

  //line
  this.line = document.createElement("div")
  this.line.className = "wordexplorer line"
  this.line.style.top = "70px"
  this.line.style.left = this.margin + "px"
  this.line.style.width = canvasSize.width - (2*this.margin) + "px"
  this.line.style.height = "3px"
  this.line.style.background = "black"
  document.body.append(this.line)

  //containers
  this.container = document.createElement("div")
  this.container.className = "wordexplorer container"
  this.container.style.top = "70px"
  this.container.style.width = canvasSize.width - (2*this.margin) + "px"
  this.container.style.left = this.margin + "px"
  document.body.append(this.container)

  this.transContainer = document.createElement("div")
  this.transContainer.className = "wordexplorer container"
  document.body.append(this.transContainer)

  //words
  this.word = document.createElement("div")
  this.word.className = "wordexplorer word"
  this.container.append(this.word)

  this.transWord = document.createElement("div")
  this.transWord.className = "wordexplorer word"
  this.transWord.style.display = "none"
  this.transContainer.append(this.transWord)

  //descriptions
  this.description = document.createElement("div")
  this.description.className = "wordexplorer description"
  this.container.append(this.description)

  this.transDescription = document.createElement("div")
  this.transDescription.className = "wordexplorer description"
  this.transWord.style.display = "none"
  this.transContainer.append(this.transDescription)

}

wordDefinition.prototype.init = function(_data) {

    this.word.innerHTML = _data.word
    this.description.innerHTML = _data.description

    // this.transWord.innerHTML = _data.transWord
    // this.transDescription.innerHTML = _data.transDescription


}
