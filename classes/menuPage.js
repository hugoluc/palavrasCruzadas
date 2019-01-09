function menuPage(){

  this.yellow = [globalColors.yellow.r,globalColors.yellow.g,globalColors.yellow.b]
  this.alpha = 1
  this.margin = canvasSize.height * 0.08
  this.infoPage = new aditionalInfoPage()

  this.container = document.createElement("div")
  this.container.id = "menu_container"
  this.container.style.position = "absolute"
  this.container.style.top = "0px"
  this.container.style.left = "0px"
  document.body.append(this.container)

  var btnSize = {
    width : canvasSize.width - (2 * this.margin ),
    height : canvasSize.height * 0.09,
  }
  this.backBtn = document.createElement("button")
  this.backBtn.style.width = btnSize.width + "px"
  this.backBtn.style.height = btnSize.height + "px"
  this.backBtn.style.top = this.margin + "px"
  this.backBtn.style.left = this.margin + "px"
  this.backBtn.style.position = "absolute"

  this.backBtn.style.borderRadius = btnSize.height + "px"
  this.backBtn.style.borderColor = "rgba(" + this.yellow[0] + "," + this.yellow[1] + "," + this.yellow[2] + "," + this.alpha + ")"
  this.backBtn.style.border = btnSize.height * 0.06 + "px solid";

  this.backBtn.style.fontSize = btnSize.height * 0.35 + "px"
  this.backBtn.style.color = "rgba(" + this.yellow[0] + "," + this.yellow[1] + "," + this.yellow[2] + "," + this.alpha + ")"

  this.backBtn.innerHTML = "Explorar mais palavras"
  this.backBtn.id = "menu_backBtn"
  this.container.append(this.backBtn)

  this.menuItems = []
  this.menuItemContainer = document.createElement("div")
  this.menuItemContainer.id = "menuItem_container"
  this.menuItemContainer.style.position = "absolute"
  this.menuItemContainer.style.top = "0px"
  this.container.append(this.menuItemContainer)

  this.itemHeight = canvasSize.height * 0.08
  var marginBottom = 50

  for(var i = 0; i < 7; i++){

    var item = {};
    var _this = this
    item.finalPosition = canvasSize.height - marginBottom - ( this.itemHeight * (i+ 1) ) + "px"

    item.container = document.createElement("div")
    item.container.style.position = "absolute"
    item.container.id = i
    item.container.className = "menuItem"
    item.container.style.opacity = 0
    item.container.style.color = "white"
    item.container.style.display = "flex"
    item.container.style.top = canvasSize.height - marginBottom - ( this.itemHeight * i ) + "px"
    item.container.style.width = canvasSize.width + "px"
    item.container.style.paddingLeft = this.margin + "px"
    item.container.style.height = this.itemHeight + "px"
    item.container.style.alignItems = "center"
    item.container.onclick = function() {
      _this.toInfoPage(this.id)
    }

    item.icon = document.getElementById("icon_svg").cloneNode(true)
    item.icon.style.display = "block"
    item.icon.style.width = this.itemHeight * 0.5 + "px"
    item.icon.style.height = this.itemHeight * 0.5 + "px"
    item.container.append(item.icon)

    item.text = document.createElement("div")
    item.text.innerHTML = "teste"
    item.text.style.fontSize = this.itemHeight * 0.3 + "px"
    item.text.style.marginLeft = this.itemHeight * 0.2 + "px"
    item.container.append(item.text)

    this.menuItems.push(item)
    this.menuItemContainer.append(item.container)
  }

}

menuPage.prototype.init = function(_data){

  this.data = _data
  var delay = 0.04
  this.backBtn.style.opacity = 1
  this.backBtn.style.transitionDelay = "translateY(0px)"

  console.log(_data);

  for(var i = 0; i < this.data.length; i++){
    this.menuItems[i].data = _data[i]
    this.menuItems[i].text.innerHTML = this.data[i].titulo
    this.menuItems[i].container.style.transform = "translateY(-" + this.itemHeight + "px)"
    this.menuItems[i].container.style.opacity = 1
    this.menuItems[i].container.style.transitionDelay = (this.data.length * delay) - (i * delay) + "s"

  }

}

menuPage.prototype.finish = function(){

  var delay = 0.04
  this.backBtn.style.opacity = 0
  this.backBtn.style.transitionDelay = "translateY(-10px)"

  for(var i = 0; i < this.data.length; i++){
    this.menuItems[i].text.innerHTML = this.data[i].titulo
    this.menuItems[i].container.classList.add("off")
    this.menuItems[i].container.style.opacity = 0
    this.menuItems[i].container.style.transitionDelay = (this.data.length * delay) - (i * delay) + "s"
  }

  setTimeout(() => {
    this.container.style.display = "none"
  }, 2000)

}

menuPage.prototype.toInfoPage = function(_data){

  this.finish()
  this.infoPage.init(this.data[_data])

}
