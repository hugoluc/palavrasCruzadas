function aditionalInfoPage(){

  var proportions = {
    height : (6/10),
    width : (2/3),
    padding : canvasSize.width * 0.05
  }

  this.container = document.createElement("div")
  this.container.id = "aditionalInfo_Contaiter"
  this.container.style.width = canvasSize.width + "px"
  this.container.style.height = canvasSize.height + "px"
  this.container.style.display = "flex"
  document.body.appendChild(this.container)

  this.images = document.createElement("div")
  this.images.id = "images"
  this.images.style.width = canvasSize.width + "px"
  this.images.style.height = canvasSize.height * (1 - proportions.height ) - (1.5 * proportions.padding) + "px"
  this.container.appendChild(this.images)

  this.tittle =  document.createElement("div")
  this.tittle.id = "aditionalTitle"
  this.tittle.style.width = (canvasSize.width * (1-proportions.width) ) - (1.5 * proportions.padding) + "px"
  this.tittle.style.height = (canvasSize.height * proportions.height) - (1.5 * proportions.padding) + "px"
  this.tittle.style.padding = proportions.padding+ "px"
  this.tittle.style.fontSize = canvasSize.width * 0.05 + "px"
  this.container.appendChild(this.tittle)

  this.text = document.createElement("div")
  this.text.id = "aditionalText"
  this.text.style.width = (canvasSize.width * proportions.width) - (1.5 * proportions.padding) + "px"
  this.text.style.height = (canvasSize.height * proportions.height) - (1.5 * proportions.padding) + "px"
  this.text.style.margin = proportions.padding+ "px"
  this.text.style.marginLeft = "0px"
  this.text.style.fontSize = canvasSize.width * 0.03 + "px"
  this.container.appendChild(this.text)

}

aditionalInfoPage.prototype.init = function(_data){

  this.images.style.backgroundImage = "url(imagens/0/0.jpg)"
  this.text.innerHTML = _data.text
  this.tittle.innerHTML = _data.titulo

}
