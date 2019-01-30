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
  this.marginBottom = 50

  for(var i = 0; i < 7; i++){

    var item = {};
    var _this = this
    // item.finalPosition = canvasSize.height - this.marginBottom - ( this.itemHeight * (i+ 1) ) + "px"
    item.container = document.createElement("div")
    item.container.style.top = canvasSize.height - this.marginBottom - ( this.itemHeight * i ) + "px"
    item.container.style.position = "absolute"
    item.container.id = i
    item.container.className = "menuItem"
    item.container.style.opacity = 0
    item.container.style.color = "white"
    item.container.style.display = "flex"
    item.container.style.width = canvasSize.width + "px"
    item.container.style.paddingLeft = this.margin + "px"
    item.container.style.height = this.itemHeight + "px"
    item.container.style.alignItems = "center"
    item.container.onclick = function() {
      _this.toInfoPage(this.id)
    }

    // item.icon = document.createElement("svg")
    // item.icon.innerHTML = '<title>noun_Plus_60246</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="06-menu-completo" transform="translate(-99.000000, -798.000000)"> <g id="Group-9" transform="translate(102.000000, 274.000000)"> <g id="Group" transform="translate(1.000000, 488.000000)"> <g id="Group-3"> <g id="noun_Plus_60246" transform="translate(0.000000, 40.000000)"> <g id="Group-10"> <path d="M54.5,34.5 L39.5,34.5 L39.5,19.5 C39.5,18.119 38.381,17 37,17 C35.619,17 34.5,18.119 34.5,19.5 L34.5,34.5 L19.5,34.5 C18.119,34.5 17,35.619 17,37 C17,38.381 18.119,39.5 19.5,39.5 L34.5,39.5 L34.5,54.5 C34.5,55.881 35.619,57 37,57 C38.381,57 39.5,55.881 39.5,54.5 L39.5,39.5 L54.5,39.5 C55.881,39.5 57,38.381 57,37 C57,35.619 55.881,34.5 54.5,34.5 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path> <circle id="Oval" stroke="#FFFFFF" stroke-width="8" cx="37" cy="37" r="37"></circle> </g> </g> </g> </g> </g> </g> </g>'
    // item.icon.setAttribute( "width" , "82px" )
    // item.icon.setAttribute( "height" , "82px" )
    // item.icon.setAttribute( "viewBox" , "0 0 82 82" )
    // item.icon.setAttribute( "version" , "1.1" )
    // item.icon.setAttribute( "xmlns" , "http://www.w3.org/2000/svg" )
    // item.icon.setAttribute( "xmlns" , 'xlink="http://www.w3.org/1999/xlink"' )

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

    this.reset()

}

menuPage.prototype.init = function(_data){

  this.container.style.display = "block"
  this.data = _data
  setTimeout( () => {
    this.animateMenus()
  } ,10)

}

menuPage.prototype.animateMenus = function() {

    var delay = 0.04
    this.backBtn.style.opacity = 1
    this.backBtn.style.transitionDelay = "translateY(0px)"

    for(var i = 0; i < this.data.length; i++){
      this.menuItems[i].container.style.transition = "opacity 0.8s, transform 1s cubic-bezier(0, 1, 0, 1)"
      this.menuItems[i].data = this.data[i]
      this.menuItems[i].text.innerHTML = this.data[i].titulo
      this.menuItems[i].container.style.transform = "translateY(-" + this.itemHeight + "px)"
      this.menuItems[i].container.style.opacity = 1
      this.menuItems[i].container.style.transitionDelay = (this.data.length * delay) - (i * delay) + "s"
    }
}

menuPage.prototype.reset = function(){

  var delay = 0.04
  this.backBtn.style.opacity = 0
  this.backBtn.style.transitionDelay = "translateY(-10px)"

  for(var i = 0; i < 7; i++){
    this.menuItems[i].container.style.transitionDuration = "0.3s , 0.1s"
    this.menuItems[i].container.style.opacity = 0
    this.menuItems[i].container.style.transform = "translateY(0px)"
    this.menuItems[i].container.style.transitionDelay = (7 * delay) - (i * delay) + "s"
  }

  setTimeout(() => {
    this.container.style.display = "none"
  }, 2000)

}

menuPage.prototype.toInfoPage = function(_data){

  this.reset()
  setTimeout( () => {
    this.infoPage.init(this.data[_data],this.init)
  },400)

}
