function aditionalInfoPage(){

  var proportions = {
    height : (6/10),
    width : (2/3),
    padding : canvasSize.width * 0.05
  }

  var transitionTime = "0.6"

  //Container
  this.container = document.createElement("div")
  this.container.id = "aditionalInfo_Contaiter"
  this.container.style.width = canvasSize.width + "px"
  this.container.style.height = canvasSize.height + "px"
  this.container.style.display = "none"
  document.body.appendChild(this.container)

  //images
  this.images = document.createElement("div")
  this.images.id = "images"
  this.images.style.width = canvasSize.width + "px"
  this.images.style.transition = "opacity " + transitionTime + "s"
  this.images.style.height = canvasSize.height * (1 - proportions.height ) - (1.5 * proportions.padding) + "px"
  this.container.appendChild(this.images)

  //Title
  this.tittle =  document.createElement("div")
  this.tittle.id = "aditionalTitle"
  this.tittle.style.transition = "opacity " + transitionTime + "s"
  this.tittle.style.width = (canvasSize.width * (1-proportions.width) ) - (1.5 * proportions.padding) + "px"
  this.tittle.style.height = (canvasSize.height * proportions.height) - (1.5 * proportions.padding) + "px"
  this.tittle.style.padding = proportions.padding+ "px"
  this.tittle.style.fontSize = canvasSize.width * 0.05 + "px"
  this.container.appendChild(this.tittle)

  //Content
  this.text = document.createElement("div")
  this.text.id = "aditionalText"
  this.text.style.width = (canvasSize.width * proportions.width) - (1.5 * proportions.padding) + "px"
  this.text.style.height = (canvasSize.height * proportions.height) - (1.5 * proportions.padding) + "px"
  this.text.style.margin = proportions.padding+ "px"
  this.text.style.marginLeft = "0px"
  this.text.style.fontSize = canvasSize.width * 0.03 + "px"
  this.text.style.transition = "opacity " + transitionTime + "s"
  this.container.appendChild(this.text)

  //Back btn
  this.backBtnContainer = document.createElement("div")
  this.container.appendChild(this.backBtnContainer)
  this.backBtnContainer.id = "backBtnContainer"
  this.backBtnContainer.style.height =  "200px"
  this.backBtnContainer.style.transition = "opacity " + transitionTime + "s"

  this.backBtn = document.createElement("div")
  this.backBtn.style.transition = "opacity " + transitionTime + "s"
  this.container.appendChild(this.backBtn)
  this.backBtn.id = "backBtn"
  this.backBtn.style.height = "200px"
  this.backBtn.style.width =  "200px"
  this.backBtn.style.background =  "white"
  this.backBtn.style.position =  "absolute"
  this.backBtn.onclick = function(){ f() }
  var f = () => { this.back() }

  this.reset()
  this.callBack = function() {return null}

}

aditionalInfoPage.prototype.init = function(_data,_callBack){

  this.callBack = _callBack
  this.data = _data
  this.container.style.display = "flex"
  setTimeout(() => {
    this.text.style.opacity = 1
    this.text.innerHTML = _data.text

    this.tittle.style.opacity = 1
    this.tittle.innerHTML = "<div class='infoPagetitle'>" + _data.titulo + "</div>"

    this.images.style.opacity = 1
    this.images.style.backgroundImage = "url(imagens/" + _data.imagens[0] + ")"

    this.backBtn.style.opacity = 1
    this.backBtnContainer.style.opacity = 1
  },100)

}


aditionalInfoPage.prototype.reset = function(){

  this.images.style.backgroundImage = ""
  this.tittle.innerHTML = ""
  this.text.style.opacity = 0
  this.tittle.style.opacity = 0
  this.images.style.opacity = 0
  this.backBtnContainer.style.opacity = 0
  this.backBtn.style.opacity = 0

}

aditionalInfoPage.prototype.back = function(){
  var _this = this
  setTimeout(() => {
    console.log("aditional info page callback")
    _this.container.style.display = "none"
    _this.callBack(menu.data)
  },1000)

  this.reset()

}
