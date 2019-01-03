function wordDefinition(){

  this.firstTitle = document.createElement("div")
  this.firstTitle.className = "wordexplorer"
  document.body.append(this.firstTitle)

  this.secondTitle = document.createElement("div")
  this.secondTitle.className = "wordexplorer"
  document.body.append(this.secondTitle)

  this.line = document.createElement("div")
  this.line.className = "wordexplorer"
  document.body.append(this.line)

  this.word = document.createElement("div")
  this.word.className = "wordexplorer"
  document.body.append(this.word)

  this.description = document.createElement("div")
  this.description.className = "wordexplorer"
  document.body.append(this.description)

  this.transWord = document.createElement("div")
  this.transWord.className = "wordexplorer"
  document.body.append(this.transWord)

  this.transDescription = document.createElement("div")
  this.transDescription.className = "wordexplorer"
  document.body.append(this.transDescription)

}

wordDefinition.prototype.init = function(_data) {

    this.word.innerHtml = _data.word
    this.description.innerHtml = _data.description


}
