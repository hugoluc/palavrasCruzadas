function aditionalInfoPage(){

  this.proportions = {
    height : (6/10),
    width : (2/3),
    padding : canvasSize.width * 0.05
  }

  var transitionTime = 0.6
  this.imageTimer = 5000

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
  this.images.style.height = canvasSize.height * (1 - this.proportions.height ) - (1.5 * this.proportions.padding) + "px"
  this.container.appendChild(this.images)

  //Title
  this.tittle =  document.createElement("div")
  this.tittle.id = "aditionalTitle"
  this.tittle.style.transition = "opacity " + transitionTime + "s"
  this.tittle.style.width = (canvasSize.width * (1-this.proportions.width) ) - (1.5 * this.proportions.padding) + "px"
  this.tittle.style.height = (canvasSize.height * this.proportions.height) - (1.5 * this.proportions.padding) + "px"
  this.tittle.style.padding = this.proportions.padding+ "px"
  this.tittle.style.fontSize = canvasSize.width * 0.05 + "px"
  this.container.appendChild(this.tittle)

  //Content
  this.text = document.createElement("div")
  this.text.id = "aditionalText"
  this.text.style.width = (canvasSize.width * this.proportions.width) - (1.5 * this.proportions.padding) + "px"
  this.text.style.height = (canvasSize.height * this.proportions.height) - (1.5 * this.proportions.padding) + "px"
  this.text.style.margin = this.proportions.padding+ "px"
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

  this.backBtn = document.getElementById("back_icon").cloneNode(true)
  this.backBtn.style.transition = "opacity " + transitionTime + "s"
  this.container.appendChild(this.backBtn)
  this.backBtn.id = "backBtn"
  this.backBtn.style.display = "block"
  this.backBtn.style.height = "50px"
  this.backBtn.style.width =  "50px"
  this.backBtn.style.top =  "70px"
  this.backBtn.style.left =  "60px"
  this.backBtn.style.position =  "absolute"
  this.backBtn.onclick = function(){ f() }

  var f = () => { this.back() }

  this.reset()
  this.callBack = function() {return null}
  this.slideLoop()

}

aditionalInfoPage.prototype.init = function(_data,_callBack){
  
  this.loaded = false
  this.callBack = _callBack
  this.data = _data
  this.container.style.display = "flex"
  setTimeout(() => {
    this.text.style.transform = "translateX(0px)"
    this.text.style.opacity = 1
    this.text.innerHTML = _data.text

    this.tittle.style.opacity = 1
    this.tittle.style.transform = "translateX(0px)"
    this.tittle.innerHTML = "<div class='infoPagetitle'>" + _data.titulo + "</div>"

    this.images.style.opacity = 1
    this.images.style.transform = "translateX(0px)"

    this.backBtn.style.opacity = 1
    this.backBtnContainer.style.opacity = 1
    
    this.addslide(this.data.imagens)

    this.loaded = true

  },100)
  currentPage = this
  this.enableBack = true
}

aditionalInfoPage.prototype.reset = function(){

  this.text.style.opacity = 0
  this.text.style.transition = "opacity  0.5s, transform 0.5s"
  this.text.style.transform = "translateX(50px)"

  this.tittle.style.opacity = 0
  this.tittle.style.transition = "opacity  0.5s, transform 0.5s"
  this.tittle.style.transform = "translateX(-50px)"

  this.images.style.opacity = 0
  this.images.style.transition = "opacity  0.5s, transform 0.5s"
  this.images.style.transform = "translateY(-50px)"

  this.backBtnContainer.style.opacity = 0
  this.backBtn.style.opacity = 0

  this.removeSlide()

}

aditionalInfoPage.prototype.back = function(){
  
  if(!this.enableBack) return
  if(animating) return

  this.enableBack = false
  animating = true
  var _this = this
  _this.callBack(menu.data)

  setTimeout(() => {
    animating = false
    _this.enableBack = true
    _this.container.style.display = "none"
  },500)

  this.reset()

}

aditionalInfoPage.prototype.addslide = function(_images){

  this.removeSlide()

  var sizes = {
    controlCircle : 35,
    controlGap : 20,
    imageHeight : canvasSize.height * (1 - this.proportions.height ) - (1.5 * this.proportions.padding)
  }

  var controlWidth = _images.length * (sizes.controlCircle + sizes.controlGap)

  if(_images.length == 1 && _images[0] == ""){
  
    this.images.style.display = "none"
    this.text.style.marginTop = "200px"
    this.tittle.style.marginTop = "200px"

  }else{
  
    this.images.style.display = "block"
    this.text.style.marginTop = ""
    this.tittle.style.marginTop = ""

  }
  

  var imageContainer = document.createElement("div")
  imageContainer.id = "imageContainer"
  this.images.appendChild(imageContainer)

  var controlsContainer = document.createElement("div")
  controlsContainer.style.width = controlWidth + "px"
  controlsContainer.style.top = (_images.length * sizes.controlCircle) + ((_images.length-1) * sizes.controlGap) + "px"
  controlsContainer.style.position = "absolute"
  controlsContainer.style.display = "flex"
  controlsContainer.style.top = sizes.imageHeight - sizes.controlCircle - 30 + "px"
  controlsContainer.style.left = (canvasSize.width/2) - (controlWidth/2) + "px"
  controlsContainer.style.zIndex = 1
  controlsContainer.id = "circles"
  
  if(_images.length == 1) {
  
    controlsContainer.style.display = "none"

  }


  this.images.appendChild(controlsContainer)

  for (var i = 0; i < _images.length; i++) {

    var image = document.createElement("div")
    image.id = "aditionalInfo_Contaiter"
    image.style.backgroundImage = "url(imagens/" + _images[i] + ")"
    image.style.backgroundSize = "cover"
    image.style.height = "100%"
    image.style.width = "100%"
    image.style.transition = "opacity 1s"
    imageContainer.appendChild(image)
    
    var circle = document.createElement("div")
    circle.style.width = sizes.controlCircle + "px"
    circle.style.height = sizes.controlCircle + "px"
    circle.style.borderRadius = sizes.controlCircle + "px"
    circle.style.marginRight = sizes.controlGap + "px"
    circle.style.background = "rgb("+globalColors.gray.r+","+globalColors.gray.g+","+globalColors.gray.b+")"
    circle.style.boxShadow = "rgba(0, 0, 0, 0.2) 1px 2px 40px 10px"
    circle.style.transition = "background 0.5s"
    controlsContainer.appendChild(circle)


  }

  this.changeImage()
  this.slideActive = true

}

aditionalInfoPage.prototype.removeSlide = function(_images){
  this.images.innerHTML = ""
  this.slideActive = false
  this.imageIndex = -1
}

aditionalInfoPage.prototype.slideLoop = function(){

  if(this.slideActive == true){
    this.changeImage()
  }
  setTimeout( () => { this.slideLoop() }, this.imageTimer)

}

aditionalInfoPage.prototype.changeImage = function(){

  var images = this.images.querySelector("#imageContainer")
  var circles = this.images.querySelector("#circles")
  for (var i = 0; i < images.children.length; i++) {
    images.children[i].style.opacity = 0
    circles.children[i].style.background = "rgb("+globalColors.gray.r+","+globalColors.gray.g+","+globalColors.gray.b+")"
  }

  this.imageIndex = this.imageIndex == images.children.length-1 ? 0 : this.imageIndex + 1
  images.children[this.imageIndex].style.opacity = 1
  circles.children[this.imageIndex].style.background = "white"


}

aditionalInfoPage.prototype.resetAll = function(){

  this.back()
  menu.toWordsPage()

}